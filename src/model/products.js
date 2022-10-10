const postgreDatabase = require("../config/postgre");

const getProducts = () => {
  return new Promise((resolve, reject) => {
    const query =
      "select product_id, product_name, product_price, product_image, product_size, product_stock, product_description, product_category, promos.promo_name, promos.discount from products full join promos on products.promo_id = promos.promo_id order by product_id asc;";
    postgreDatabase.query(query, (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const findProducts = () => {
  return new Promise((resolve, reject) => {
    const query =
      "select product_id, product_name, product_price, product_image, product_size, product_stock, product_description, product_category, promos.promo_name, promos.discount from products join promos on products.promo_id = promos.promo_id order by product_id asc";
    postgreDatabase.query(query, (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const filterCategoryProducts = (queryParams) => {
  return new Promise((resolve, reject) => {
    const query =
      "select product_id, product_name, product_price, product_image, product_stock, product_category from products where lower(product_category) like lower($1)";
    const values = [`%${queryParams.product_category}%`];
    console.log(values);
    postgreDatabase.query(query, values, (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const sortingProducts = (queryParams) => {
  return new Promise((resolve, reject) => {
    const query =
      "select transaction_id, delivery_address, product_id, order_quantity, order_total_price, transaction_amount_fee, payment_date from transactions where lower(delivery_address) like lower($1)";
    const values = [`%${queryParams.delivery_address}%`];
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
      "insert into products (product_name, product_price, product_image, product_size, product_stock, product_description, product_category) values ($1, $2, $3, $4, $5, $6, $7)";
    const {
      product_name,
      product_price,
      product_image,
      product_size,
      product_stock,
      product_description,
      product_category,
    } = body;
    postgreDatabase.query(
      query,
      [
        product_name,
        product_price,
        product_image,
        product_size,
        product_stock,
        product_description,
        product_category,
      ],
      (error, result) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        return resolve(result);
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
        query += `${key} = $${index + 1} where product_id = $${index + 2}`;
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
    const query = "delete from products where product_id = $1";
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
  filterCategoryProducts,
  sortingProducts,
  findProducts,
  createProducts,
  editProducts,
  dropProducts,
};

module.exports = productsModel;
