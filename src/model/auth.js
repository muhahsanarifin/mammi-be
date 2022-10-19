const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const postgreDatabase = require("../config/postgre");

const login = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password } = body;

    // First step ↴
    const getPasswordByEmailQuery =
      "select id, password, role from users where email = $1";
    const getPasswordByEmailValues = [email];
    postgreDatabase.query(
      getPasswordByEmailQuery,
      getPasswordByEmailValues,
      (error, response) => {
        if (error) {
          console.log(error);
          return reject({ error });
        }
        if (response.rows.length === 0)
          return reject({
            error: new Error("Email is incorrect"),
            statusCode: 401,
          });

        // Second step ↴
        const hashedPassword = response.rows[0].password;
        bcrypt.compare(password, hashedPassword, (error, isSame) => {
          if (error) {
            return reject({ error });
          }
          if (!isSame)
            return reject({
              error: new Error("Password is incorrect"),
              statusCode: 401,
            });

          // Third step ↴
          const payload = {
            id: response.rows[0].id,
            email: response.rows[0].email,
            role: response.rows[0].role,
          };
          jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
              expiresIn: "6m",
              issuer: process.env.ISSUER,
            },
            (error, token) => {
              if (error) {
                return reject({ error });
              }
              return resolve({
                token,
                role: payload.role,
                email: payload.email,
                id: payload.id,
              });
            }
          );
        });
      }
    );
  });
};

// Logout ↴
const logout = (token) => {
  new Promise((resolve, reject) => {
    const query = "insert into tokens(token) values($1)";
    postgreDatabase.query(query, [token], (error, result) => {
      if (error) {
        console.log(error);
        return reject({
          error: new Error("Internet Server Error"),
          status: 500,
        });
      }
      return resolve({
        message: "Logout is successfully",
        status: "200",
      });
    });
  });
};

const modelAuth = { login, logout };

module.exports = modelAuth;
