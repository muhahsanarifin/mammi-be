const postgreDatabase = require("../config/postgre");

const getProducts = (queryParams) => {
  return new Promise((resolve, reject) => {
    // Find all products ↴
    let query =
      "select p.id, p.product_name, c.category_name, p.image, p.created_at, p.updated_at, p.price from products p join categories c on p.category_id = c.id";

    // Filter products ↴
    if (queryParams.post == "latest") {
      query += ` order by p.created_at desc`;
    }

    if (queryParams.post == "oldest") {
      query += ` order by p.created_at asc`;
    }

    if (queryParams.price == "low") {
      query += ` order by p.price asc`;
    }

    if (queryParams.price == "expensive") {
      query += ` order by p.price desc`;
    }

    // Filter  Category Products ↴
    if (queryParams.filter) {
      query += ` where lower(c.category_name) like lower('%${queryParams.filter}%')`;
    }

    // Search Products ↴
    if (queryParams.search) {
      query += ` where lower(p.product_name) like lower('%${queryParams.search}%')`;
    }

    if (queryParams.page && queryParams.limit) {
      let page = Number(queryParams.page);
      let limit = Number(queryParams.limit);
      let offset = (page - 1) * limit;
      query += ` order by p.id limit ${limit} offset ${offset}`;
    }
    postgreDatabase.query(query, (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const createProducts = (body, file) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into products (product_name, category_id, image, price) values ($1,$2,$3,$4) returning *";
    const { product_name, category_id, price } = body;
    const imageURL = `/images/${file.filename}`;
    const values = [product_name, category_id, imageURL, price];
    postgreDatabase.query(query, values, (error, result) => {
      if (error) {
        console.log(error);
        reject(error);
      }
      resolve(result);
    });
  });
};

const updateProducts = (body, params, file) => {
  return new Promise((resolve, reject) => {
    let query = "update products set ";

    const data = [];

    Object.keys(body).forEach((key, index, array) => {
      if (index === array.length - 1) {
        query += `${key} = $${index + 1} where products.id = $${
          index + 2
        } returning *`;
        data.push(body[key], params.id);
        return;
      }
      query += `${key} = $${index + 1},`;
      data.push(body[key]);
    });
    postgreDatabase.query(query, data, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const dropProducts = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from products where id = $1";
    postgreDatabase.query(query, [params.id], (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const productsModel = {
  getProducts,
  createProducts,
  updateProducts,
  dropProducts,
};

module.exports = productsModel;
