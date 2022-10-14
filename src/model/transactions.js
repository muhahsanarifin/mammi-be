const postgreDatabase = require("../config/postgre");

const getTransactions = () => {
  return new Promise((resolve, reject) => {
    const query =
      "select t.id, users.email, users.phone_number, t.tax, payments.method_payment, promos.discount, t.notes, t.status, deliveries.method_delivery, deliveries.shipping, t.created_at, t.updated_at from transactions t join users on t.user_id = users.id join payments on t.payment_id = payments.id join promos on t.promo_id = promos.id join deliveries on t.delivery_id  = deliveries.id order by t.id asc;";
    postgreDatabase.query(query, (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

// const createTransactions = (body) => {
//   return new Promise((resolve, reject) => {
//     const query =
//       "";
//     const {} = body;
//     postgreDatabase.query(
//       query,
//       [
//       ],
//       (error, result) => {
//         if (error) {
//           console.log(error);
//           return reject(error);
//         }
//         return resolve(result);
//       }
//     );
//   });
// };

const editTransactions = (body, params) => {
  return new Promise((resolve, reject) => {
    let query = "update transactions set ";
    const data = [];
    Object.keys(body).forEach((key, index, array) => {
      if (index === array.length - 1) {
        query += `${key} = $${index + 1} where id = $${index + 2}`;
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

const dropTransactions = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from transactions where id = $1";
    postgreDatabase.query(query, [params.id], (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const transactionsModel = {
  getTransactions,
  // createTransactions,
  editTransactions,
  dropTransactions,
};

module.exports = transactionsModel;
