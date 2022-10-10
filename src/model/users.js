const postgreDatabase = require("../config/postgre");

const getUsers = () => {
  return new Promise((resolve, reject) => {
    const query =
      "select user_id, display_name, first_name, last_name, birth, email, phone_number from users order by user_id asc";
    postgreDatabase.query(query, (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const createUsers = (body) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into users (first_name, last_name ,email, phone_number, address) values ($1,$2,$3,$4,$5)";
    const { first_name, last_name, email, phone_number, address } = body;
    postgreDatabase.query(
      query,
      [first_name, last_name, email, phone_number, address],
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

const editUsers = (body, params) => {
  return new Promise((resolve, reject) => {
    let query = "update users set ";
    const data = [];
    Object.keys(body).forEach((key, index, array) => {
      if (index === array.length - 1) {
        query += `${key} = $${index + 1} where user_id = $${index + 2}`;
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

const dropUsers = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from users where user_id = $1";
    postgreDatabase.query(query, [params.id], (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const usersModel = {
  getUsers,
  createUsers,
  editUsers,
  dropUsers,
};

module.exports = usersModel;
