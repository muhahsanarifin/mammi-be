/* eslint-disable prettier/prettier */

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
    
    postgreDatabase.query(query, (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

// Issues ↴
const productPages = (queryParams) => {
  return new Promise((resolve, reject) => {
    let query =
      // "select p.id, p.product_name, c.category_name, p.image, p.created_at, p.updated_at, p.price from products p full outer join categories c on p.category_id = c.id";
      "select * from products ";

    let values = [];
    let whereParams = ["product_name"];
    if (whereParams.length > 0) query += "where ";
    whereParams.forEach((key) => {
      query += `lower(${key}) like lower($${values.length + 1})`;
      values.push(String(queryParams[key]));
    });

    let page = Number(queryParams.page);
    let limit = Number(queryParams.limit);
    let offset = (page - 1) * limit;
    query += `limit $${values.length + 1} offset $${values.length + 2}`;
    values.push(limit, offset);   
    postgreDatabase.query(query, values, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
}


const createProducts = (body, file) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into products (product_name, category_id, image, price) values ($1,$2,$3,$4) returning product_name";
    const {product_name, category_id, price} =
      body;
      const values = [product_name, category_id, file, price];
      console.log(values);
    postgreDatabase.query(
      query,
      values,
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

const updateProducts = (body, params) => {
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
  productPages,
  createProducts,
  updateProducts,
  dropProducts,
};

module.exports = productsModel;
