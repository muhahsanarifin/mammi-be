const postgreDatabase = require("../config/postgre");

const getPromos = (queryParams, url) => {
  return new Promise((resolve, reject) => {
    let query =
      "select promos.id, promos.code, promos.discount, p.product_name, p.image, promos.created_at, promos.updated_at from promos join products p on promos.product_id = p.id order by promos.id asc";

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

const getPromo = (params) => {
  return new Promise((resolve, reject) => {
    const query =
      "select promos.code, promos.discount, products.image, promos.created_at, promos.updated_at from promos left join products on promos.product_id = products.id where promos.id = $1";
    postgreDatabase.query(query, [params.id], (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

const createPromos = (body) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into promos (code, discount, product_id, created_at, updated_at) values ($1, $2, $3, $4, $5)";
    const { code, discount, product_id } = body;

    let date = new Date();
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    const currentDate = `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;

    postgreDatabase.query(
      query,
      [code, discount, product_id, currentDate, currentDate],
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

// TODO: Research
const editPromos = (body, params) => {
  return new Promise((resolve, reject) => {
    const query =
      "update promos set code = $2, discount = $3, product_id = $4, updated_at = $5 where promos.id = $1 returning *";

    const { code, discount, product_id } = body;

    let date = new Date();
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    const updatedDate = `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;

    postgreDatabase.query(
      query,
      [params.id, code, discount, product_id, updatedDate],
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
  getPromo,
  createPromos,
  editPromos,
  dropPromos,
};

module.exports = promosModel;
