const postgreDatabase = require("../config/postgre");

const getDeliveries = () => {
  return new Promise((resolve, reject) => {
    let query =
      "select id, method, shipping, charge_cost, created_at, updated_at from deliveries order by deliveries.id asc";

    postgreDatabase.query(query, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const getDelivery = (params) => {
  return new Promise((resolve, reject) => {
    let query =
      "select id, method, shipping, charge_cost, created_at, updated_at from deliveries where deliveries.id = $1";

    postgreDatabase.query(query, [params.id], (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};

const createDelivery = (body) => {
  return new Promise((resolve, reject) => {
    let query =
      "insert into deliveries (method, shipping, charge_cost, created_at, updated_at) values ($1, $2, $3, $4, $5)";
    const { method, shipping, charge_cost } = body;

    let date = new Date();
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    const currentDate = `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;

    let values = [method, shipping, charge_cost, currentDate, currentDate];

    postgreDatabase.query(query, values, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const editDelivery = (body, params) => {
  return new Promise((resolve, reject) => {
    let query = "update deliveries set ";
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
    //   "update deliveries set method = $2, shipping = $3, charge_cost = $4, updated_at = $5 where deliveries.id = $1 returning *";

    // const { method, shipping, charge_cost } = body;

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

const dropDelivery = (params) => {
  return new Promise((resolve, reject) => {
    let query = "delete from deliveries where deliveries.id = $1";

    postgreDatabase.query(query, [params.id], (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const deliveryModal = {
  getDeliveries,
  getDelivery,
  createDelivery,
  editDelivery,
  dropDelivery,
};

module.exports = deliveryModal;
