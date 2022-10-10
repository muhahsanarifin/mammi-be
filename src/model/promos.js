const postgreDatabase = require("../config/postgre");

const getPromos = () => {
  return new Promise((resolve, reject) => {
    const query =
      "select promo_id, promo_name, coupon_code, discount, valid_promo from promos order by promo_id asc";
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
      "insert into promos (promo_name, coupon_code, discound, valid_promo) values ($1, $2, $3 , $4)";
    const { promo_name, coupon_code, discound, valid_promo } = body;
    postgreDatabase.query(
      query,
      [promo_name, coupon_code, discound, valid_promo],
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
    let query = "update products set ";
    const data = [];
    Object.keys(body).forEach((key, index, array) => {
      if (index === array.length - 1) {
        query += `${key} = $${index + 1} where promo_id = $${index + 2}`;
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
