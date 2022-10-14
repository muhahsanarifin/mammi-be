const postgreDatabase = require("../config/postgre");

const getProducts = (queryParams) => {
  return new Promise((resolve, reject) => {
    // Init query
    let query;
    query = "select * from products p";
    query = "select * from categories c";

    // Find all products
    query =
      "select p.id, p.product_name, c.category_name, p.image, p.created_at, p.updated_at, p.price from products p join categories c on p.category_id = c.id";

    // Filter products
    if (queryParams.price == "low") {
      query =
        "select p.id, p.product_name, c.category_name, p.image, p.created_at, p.updated_at, p.price from products p join categories c on p.category_id = c.id order by p.price asc";
    }
    if (queryParams.price == "expensive") {
      query =
        "select p.id, p.product_name, c.category_name, p.image, p.created_at, p.updated_at, p.price from products p join categories c on p.category_id = c.id order by p.price desc";
    }

    if (queryParams.post == "oldest") {
      query =
        "select p.id, p.product_name, c.category_name, p.image, p.created_at, p.updated_at, p.price from products p join categories c on p.category_id = c.id order by p.created_at asc";
    }

    if (queryParams.post == "newest") {
      query =
        "select p.id, p.product_name, c.category_name, p.image, p.created_at, p.updated_at, p.price from products p join categories c on p.category_id = c.id order by p.updated_at desc";
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

const findProducts = (queryParams) => {
  return new Promise((resolve, reject) => {
    // Init query
    let query;
    query = "select * from products p";
    query = "select * from categories c";

    query =
      "select p.id, p.product_name, c.category_name, p.image, p.created_at, p.updated_at, p.price from products p join categories c on p.category_id = c.id where lower(c.category_name) like lower($1)";
    let values = [`%${queryParams.c.category_name}%`];
    postgreDatabase.query(query, values, (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const createProducts = (body) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into products (product_name, product_price, product_image) values ($1,$2,$3)";
    const { product_name, product_price, product_image } = body;
    postgreDatabase.query(
      query,
      [product_name, product_price, product_image],
      (error, result) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(result);
      }
    );
  });
};

const editProducts = (body, params) => {
  return new Promise((resolve, reject) => {
    let query = "update products set ";

    const data = [];

    Object.keys(body).forEach((key, index, array) => {
      if (index === array.length - 1) {
        query += `${key} = $${index + 1} where products.id = $${index + 2}`;
        data.push(body[key], params.id);
        return;
      }
      query += `${key} = $${index + 1},`;
      data.push(body[key]);
    });
    postgreDatabase.query(query, data, (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const dropProducts = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from products where products.id = $1";
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
  findProducts,
  createProducts,
  editProducts,
  dropProducts,
};

module.exports = productsModel;
