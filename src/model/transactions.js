const postgreDatabase = require("../config/postgre");

const getTransactions = (queryParams, url) => {
  return new Promise((resolve, reject) => {
    let query =
      "select u.id , t.tax, pay.method, d.method, pro.discount, t.notes, t.status, t.total, prod.product_name, s.size, t.qty, t.subtotal from transactions t left join users u on user_id = u.id left join products prod on product_id = prod.id left join payments pay on payment_id = pay.id left join deliveries d on delivery_id = d.id left join promos pro on promo_id = pro.id left join sizes s on size_id = s.id";

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

// || Under maintenance

const getHistory = (token) => {
  return new Promise((resolve, reject) => {
    const query =
      "select p.product_name, p.price, p.image, t.notes, t.status from transactions t left join users u on t.user_id = u.id left join products p on t.product_id = p.id where user_id = $1";

    postgreDatabase.query(query, [token], (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const createTransactions = (body, token) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into transactions ( user_id, product_id, promo_id, size_id, qty, subtotal, tax, delivery_id, payment_id, notes, status, total) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *";
    const {
      product_id,
      size_id,
      promo_id,
      qty,
      delivery_id,
      payment_id,
      notes,
      total,
      subtotal,
      tax,
      // TODO: Research
      // total,
      // subtotal,
      // tax,
    } = body;
    // TODO: Research
    // let subTotal = product price(promo or not promo) * qty + tax + delivery fee = subtotal === total
    postgreDatabase.query(
      query,
      [
        token,
        product_id,
        promo_id,
        size_id,
        qty,
        subtotal,
        tax,
        delivery_id,
        payment_id,
        notes,
        "Pending",
        total,
      ],
      (error, result) => {
        if (error) {
          // console.log(error);
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
        query += `${key} = $${index + 1} where id = $${index + 2} returning *`;
        data.push(body[key], params.id);
        return;
      }
      query += `${key} = $${index + 1},`;
      data.push(body[key]);
    });
    postgreDatabase.query(query, data, (error, result) => {
      if (error) {
        // console.log(error);
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
        // console.log(error);
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

// || Under maintenance
