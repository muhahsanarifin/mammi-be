const postgreDatabase = require("../config/postgre");

// Get Promos ↴ // ◔ On progress
const getPromos = (queryParams, url) => {
  return new Promise((resolve, reject) => {
    let query =
      "select promos.id, promos.code, promos.discount, p.product_name, promos.created_at, promos.updated_at from promos join products p on promos.product_id = p.id order by promos.id asc";

    let link = `${url}/promos?`;

    let queryLimit = "";
    let values = [];

    if (queryParams.page && queryParams.limit) {
      let page = Number(queryParams.page);
      let limit = Number(queryParams.limit);
      let offset = (page - 1) * limit;
      queryLimit = query + ` limit $1 offset $2`;
      values.push(limit, offset);
    } else {
      queryLimit = query;
    }

    postgreDatabase.query(query, (error, result) => {
      postgreDatabase.query(queryLimit, values, (error, queryResult) => {
        if (error) {
          return reject(error);
        }
        if (queryResult.rows.length == 0)
          return reject(new Error("Promo Not Found"));
        let nextRes = null;
        let prevRes = null;
        if (queryParams.page && queryParams.limit) {
          let page = parseInt(queryParams.page);
          let limit = parseInt(queryParams.limit);
          let start = (page - 1) * limit;
          let end = page * limit;
          let next = "";
          let prev = "";
          // console.log(queryResult);
          const nextData = Math.ceil(result.rowCount / limit);
          if (start <= result.rowCount) {
            next = page + 1;
          }
          if (end > 0) {
            prev = page - 1;
          }
          if (parseInt(next) <= parseInt(nextData)) {
            nextRes = `${link}page=${next}&limit=${limit}`;
          }
          if (parseInt(prev) !== 0) {
            prevRes = `${link}page=${prev}&limit=${limit}`;
          }
          let sendResponse = {
            dataCount: result.rowCount,
            next: nextRes,
            previous: prevRes,
            totalPages: Math.ceil(result.rowCount / limit),
            data: queryResult.rows,
          };
          return resolve(sendResponse);
        }
        let sendResponse = {
          dataCount: result.rowCount,
          next: nextRes,
          previous: prevRes,
          totalPages: null,
          data: queryResult.rows,
        };
        return resolve(sendResponse);
      });
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
