const postgreDatabase = require("../config/postgre");

const getTransactions = () => {
  return new Promise((resolve, reject) => {
    const query =
      "select transactions.transaction_id, users.user_role, users.display_name, products.product_name, products.product_price, transactions.order_quantity, transactions.order_date, transactions.order_total_price from transactions join users on transactions.user_id = users.user_id join products on transactions.product_id = products.product_id order by order_date asc;";
    postgreDatabase.query(query, (error, result) => {
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
      "insert into transactions (order_quantity, order_total_price, delivery_address, delivery_fee, delivery_method, delivery_status, transaction_amount_fee, payment_method, user_id, product_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
    const {
      order_quantity,
      order_total_price,
      delivery_address,
      delivery_fee,
      delivery_method,
      delivery_status,
      transaction_amount_fee,
      payment_method,
      user_id,
      product_id,
    } = body;
    postgreDatabase.query(
      query,
      [
        order_quantity,
        order_total_price,
        delivery_address,
        delivery_fee,
        delivery_method,
        delivery_status,
        transaction_amount_fee,
        payment_method,
        user_id,
        product_id,
      ],
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
        query += `${key} = $${index + 1} where transaction_id = $${index + 2}`;
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
    const query = "delete from transactions where transaction_id = $1";
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
  createTransactions,
  editTransactions,
  dropTransactions,
};

module.exports = transactionsModel;
