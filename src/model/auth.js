const bcrypt = require("bcrypt");
const JWTR = require("jwt-redis").default;
const client = require("../config/redis");
const postgreDatabase = require("../config/postgre");

// Login ↴
const login = (body) => {
  return new Promise((resolve, reject) => {
    const { email, password } = body;
    const jwtr = new JWTR(client);

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

          jwtr
            .sign(payload, process.env.SECRET_KEY, {
              expiresIn: "24h",
              issuer: process.env.ISSUER,
            })
            .then((token) => {
              return resolve({ id: payload.id, role: payload.role, token });
            });
        });
      }
    );
  });
};

// Logout ↴
const logout = (token) => {
  return new Promise((resolve, reject) => {
    const jwtr = new JWTR(client);
    jwtr.destroy(token.jti).then((res) => {
      if (!res) reject(new Error("Login First"), statusCode);
      return resolve();
    });
  });
};

const modelAuth = { login, logout };

module.exports = modelAuth;
