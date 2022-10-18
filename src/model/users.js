const bcrypt = require("bcrypt");
const postgreDatabase = require("../config/postgre");

// Register Users Model ↴ // ◔ On progress
const registerUsers = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password, phone_number } = body;
    bcrypt.hash(password, 10, (error, hashedPassord) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      const query =
        "insert into users (email, password, phone_number) values ($1, $2, $3) returning id";
      const values = [email, hashedPassord, phone_number];
      postgreDatabase.query(query, values, (error, response) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        const queryProfile = `insert into profiles (user_id) values(${response.rows[0].id})`;
        postgreDatabase.query(queryProfile, (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        });
      });
    });
  });
};

// Edit Users Model ↴ // ◔ On progress
const editPassword = (body) => {
  return new Promise((resolve, reject) => {
    const { old_password, new_password, id } = body;
    const getPwdQuery = "select password from users where id = $1";
    const getPwdValues = [id];
    postgreDatabase.query(getPwdQuery, getPwdValues, (error, response) => {
      if (error) {
        console.log(error);
        return reject({ error });
      }
      const hashedPassword = response.rows[0].password;
      bcrypt.compare(old_password, hashedPassword, (error, isSame) => {
        if (error) {
          console.log(error);
          return reject({ error });
        }
        if (!isSame)
          return reject({
            error: new Error("Old Password is wrong"),
            statusCode: 403,
          });
        bcrypt.hash(new_password, 10, (error, newHashedPassword) => {
          if (error) {
            console.log(error);
            return reject({ error });
          }
          const editPwdQuery = "update users set password = $1 where id = $2";
          const editPwdValues = [newHashedPassword, id];
          postgreDatabase.query(
            editPwdQuery,
            editPwdValues,
            (error, response) => {
              if (error) {
                console.log(error);
                return reject({ error });
              }
              return resolve(response);
            }
          );
        });
      });
    });
  });
};

const editProfile = (body, params) => {
  return new Promise((resolve, reject) => {
    let query = "update profiles set ";

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

const deleteAccount = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from profiles where user_id = $1";
    const values = [params.id];
    postgreDatabase.query(query, values, (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const getUsers = () => {
  return new Promise((resolve, reject) => {
    const query =
      "select id, email, phone_number, role, created_at, updated_at from users order by id asc";
    postgreDatabase.query(query, (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const getUser = (queryParams) => {
  return new Promise((resolve, reject) => {
    const query =
      "select id, email, password, phone_number, role, created_at, updated_at from users where id = $1";
    postgreDatabase.query(query, [queryParams.id], (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const usersModel = {
  registerUsers,
  editPassword,
  getUsers,
  getUser,
  editProfile,
  deleteAccount,
};

module.exports = usersModel;
