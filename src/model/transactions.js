const postgreDatabase = require("../config/postgre");

const getTransactions = (queryParams, url) => {
  return new Promise((resolve, reject) => {
    let query =
      "select t.id, user_id, users.email, users.phone_number, t.tax, payments.method, promos.discount, t.notes, t.status, deliveries.method, deliveries.shipping, t.created_at, t.updated_at from transactions t join users on t.user_id = users.id join payments on t.payment_id = payments.id join promos on t.promo_id = promos.id join deliveries on t.delivery_id  = deliveries.id order by t.id asc";

    let link = `${url}/transactions?`;

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
        console.log(queryLimit);
        console.log(values);
        if (error) {
          return reject(error);
        }
        if (queryResult.rows.length == 0)
          return reject(new Error("Transaction Not Found"));
        let nextRes = null;
        let prevRes = null;
        if (queryParams.page && queryParams.limit) {
          let page = parseInt(queryParams.page);
          let limit = parseInt(queryParams.limit);
          let start = (page - 1) * limit;
          let end = page * limit;
          let next = "";
          let prev = "";
          // console.log(queryResult);
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

const getHistory = (queryParams) => {
  return new Promise((resolve, reject) => {
    const query =
      "select transactions.user_id, products.product_name, transactions.status, sizes.size, qty, subtotal from transactions_product_size join transactions on transactions_product_size.transaction_id = transactions.id join products on transactions_product_size.product_id = products.id join sizes on transactions_product_size.size_id = sizes.id where transaction_id = $1 ";

    postgreDatabase.query(query, [queryParams.id], (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const createTransactions = (body) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into transactions (user.id, taxt, payment_id, delivery_id promo_id, notes, status) values ($1,$2,$3,$4,$5,$6,$7)";
    const { user_id, text, payment_id, delivery_id, promo_id, notes, status } =
      body;
    postgreDatabase.query(
      query,
      [user_id, text, payment_id, delivery_id, promo_id, notes, status],
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
  getHistory,
  createTransactions,
  editTransactions,
  dropTransactions,
};

module.exports = transactionsModel;
