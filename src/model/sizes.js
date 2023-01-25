const postgreDatabase = require("../config/postgre");

const getSizes = () => {
  return new Promise((resolve, reject) => {
    let query =
      "select id, size, name, cost, created_at, updated_at from sizes order by sizes.id asc";

    postgreDatabase.query(query, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const getSize = (params) => {
  return new Promise((resolve, reject) => {
    let query =
      "select id, size, name, cost, created_at, updated_at from sizes where id = $1";

    postgreDatabase.query(query, [params.id], (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

const createSize = (body) => {
  return new Promise((resolve, reject) => {
    let query =
      "insert into sizes (size, cost, name, created_at, updated_at) values ($1, $2, $3, $4, $5)";
    const { size, cost, name } = body;

    let date = new Date();
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    const currentDate = `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;

    let values = [size, cost, name, currentDate, currentDate];

    postgreDatabase.query(query, values, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const editSize = (body, params) => {
  return new Promise((resolve, reject) => {
    let query = "update sizes set ";
    const value = [];
    Object.keys(body).forEach((key, index, array) => {
      if (index === array.length - 1) {
        query += `${key} = $${index + 1} where id = $${index + 2} returning *`;
        value.push(body[key], params.id);
        return;
      }
      query += `${key} = $${index + 1},`;
      value.push(body[key]);
    });

    // Research
    // const query =
    //   "update sizes set size = $2, cost = $3, name = $4, updated_at = $5 where id = $1 returning *";

    // const { size, cost, name } = body;

    // let date = new Date();
    // let day = ("0" + date.getDate()).slice(-2);
    // let month = ("0" + (date.getMonth() + 1)).slice(-2);
    // let year = date.getFullYear();
    // let hours = date.getHours();
    // let minutes = date.getMinutes();
    // let seconds = date.getSeconds();

    // const updatedDate = `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;

    postgreDatabase.query(query, value, (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const dropSize = (params) => {
  return new Promise((resolve, reject) => {
    let query = "delete from sizes where sizes.id = $1";

    postgreDatabase.query(query, [params.id], (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const sizesModel = {
  getSizes,
  getSize,
  createSize,
  editSize,
  dropSize,
};

module.exports = sizesModel;
