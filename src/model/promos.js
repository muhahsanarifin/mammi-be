const postgreDatabase = require("../config/postgre");

// Get Promos ↴ // ◔ On progress
const getPromos = (queryParams) => {
  return new Promise((resolve, reject) => {
    let query =
      "select promos.id, promos.code, promos.discount, p.product_name, promos.created_at, promos.updated_at from promos join products p on promos.product_id = p.id order by promos.id asc";

    if (queryParams.page && queryParams.limit) {
      let page = Number(queryParams.page);
      let limit = Number(queryParams.limit);
      let offset = (page - 1) * limit;
      query = `select promos.id, promos.code, promos.discount, p.product_name, promos.created_at, promos.updated_at from promos join products p on promos.product_id = p.id order by promos.id limit ${limit} offset ${offset}`;
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

const createPromos = (body) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into promos (code, discount, product_id, created_at, updated_at) values ($1, $2, $3, $4, $5)";
    const { code, discount, product_id, created_at, updated_at } = body;
    postgreDatabase.query(
      query,
      [code, discount, product_id, created_at, updated_at],
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

const editPromos = (body, params) => {
  return new Promise((resolve, reject) => {
    let query = "update promos set ";

    const data = [];

    Object.keys(body).forEach((key, index, array) => {
      if (index === array.length - 1) {
        query += `${key} = $${index + 1} where promos.id = $${index + 2}`;
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

const dropPromos = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from promos where id = $1";
    postgreDatabase.query(query, [params.id], (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const promosModel = {
  getPromos,
  createPromos,
  editPromos,
  dropPromos,
};

module.exports = promosModel;
