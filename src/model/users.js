const bcrypt = require("bcrypt");
const postgreDatabase = require("../config/postgre");

// ▣ New Script

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
      postgreDatabase.query(query, values, (error, result) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        return resolve(result);
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

const getUsers = () => {
  return new Promise((resolve, reject) => {
    const query =
      "select id, email, password, phone_number, role, created_at, updated_at from users order by id asc";
    postgreDatabase.query(query, (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const getUser = (params) => {
  return new Promise((resolve, reject) => {
    const query =
      "select id, email, password, phone_number, role, created_at, updated_at from users where id = $1";
    postgreDatabase.query(query, [params.id], (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

// ▢ Old Script
// const getUsers = () => {
//   return new Promise((resolve, reject) => {
//     const query =
//       "select user_id, display_name, first_name, last_name, birth, email, phone_number from users order by user_id asc";
//     postgreDatabase.query(query, (error, result) => {
//       if (error) {
//         console.log(error);
//         return reject(error);
//       }
//       return resolve(result);
//     });
//   });
// };

// const editUsers = (body, params) => {
//   return new Promise((resolve, reject) => {
//     let query = "update users set ";
//     const data = [];
//     Object.keys(body).forEach((key, index, array) => {
//       if (index === array.length - 1) {
//         query += `${key} = $${index + 1} where user_id = $${index + 2}`;
//         data.push(body[key], params.id);
//         return;
//       }
//       query += `${key} = $${index + 1},`;
//       data.push(body[key]);
//     });
//     postgreDatabase.query(query, data, (error, result) => {
//       if (error) {
//         console.log(error);
//         return reject(error);
//       }
//       return resolve(result);
//     });
//   });
// };

// const dropUsers = (params) => {
//   return new Promise((resolve, reject) => {
//     const query = "delete from users where user_id = $1";
//     postgreDatabase.query(query, [params.id], (error, result) => {
//       if (error) {
//         console.log(error);
//         return reject(error);
//       }
//       return resolve(result);
//     });
//   });
// };

const usersModel = { registerUsers, editPassword, getUsers, getUser };

module.exports = usersModel;
