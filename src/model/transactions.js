const postgreDatabase = require("../config/postgre");

const getTransactions = (queryParams, url) => {
  return new Promise((resolve, reject) => {
    let query;
    query =
      "select t.id, t.user_id, u.email, t.tax, pay.method, d.method, pro.discount, t.notes, t.status, t.total, prod.product_name, prod.image, s.size, t.qty, t.subtotal from transactions t left join users u on user_id = u.id left join products prod on product_id = prod.id left join payments pay on payment_id = pay.id left join deliveries d on delivery_id = d.id left join promos pro on promo_id = pro.id left join sizes s on size_id = s.id";

    let link = `${url}/transactions?`;

    if (queryParams.status) {
      query = `select t.id, t.user_id, u.email, t.tax, pay.method, d.method, pro.discount, t.notes, t.status, t.total, prod.product_name, prod.image, s.size, t.qty, t.subtotal from transactions t left join users u on user_id = u.id left join products prod on product_id = prod.id left join payments pay on payment_id = pay.id left join deliveries d on delivery_id = d.id left join promos pro on promo_id = pro.id left join sizes s on size_id = s.id where lower(t.status) like lower('%${queryParams.status}%')`;
      link += `status=${queryParams.status}&`;

      if (queryParams.customer) {
        query += ` and lower(t.user_id) like lower('%${queryParams.status}%')`;
      }
    }

    if (queryParams.customer) {
      query = `select t.id, t.user_id, u.email, t.tax, pay.method, d.method, pro.discount, t.notes, t.status, t.total, prod.product_name, prod.image, s.size, t.qty, t.subtotal from transactions t left join users u on user_id = u.id left join products prod on product_id = prod.id left join payments pay on payment_id = pay.id left join deliveries d on delivery_id = d.id left join promos pro on promo_id = pro.id left join sizes s on size_id = s.id where t.user_id = ${queryParams.customer}`;
      link += `customer=${queryParams.customer}`;

      if (queryParams.status) {
        query += ` and lower(t.status) like lower('%${queryParams.status}%')`;
      }
    }

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
      console.log("Result: ", result);
      if (error) {
        return reject(error);
      }
      if (result.rows.length === 0)
        return reject({
          error: new Error("Product Not Found"),
          statusCode: 404,
        });
      postgreDatabase.query(queryLimit, values, (error, queryResult) => {
        console.log(queryLimit);
        console.log(values);
        if (error) {
          return reject(error);
        }
        if (queryResult.rows.length === 0)
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
      "insert into transactions ( user_id, tax, payment_id, delivery_id, promo_id, notes, address, telp, status, created_at, updated_at, total, product_id, size_id, qty, subtotal) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) returning *";
    const {
      product_id,
      size_id,
      promo_id,
      qty,
      delivery_id,
      payment_id,
      notes,
      address,
      telp,
      total,
      subtotal,
      tax,
      // || Research
      // total,
      // subtotal,
      // tax,
    } = body;
    // || Research
    // let subTotal = ((product price * (promo or not promo / 100%)) * qty )
    // let total = (subTotal+ tax + delivery fee)

    let date = new Date();
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    const currentDate = `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;

    const initStatus = "Pending";

    const value = [
      token,
      tax,
      payment_id,
      delivery_id,
      promo_id,
      notes,
      address,
      telp,
      initStatus,
      currentDate,
      currentDate,
      total,
      product_id,
      size_id,
      qty,
      subtotal,
    ];
    postgreDatabase.query(query, value, (error, result) => {
      if (error) {
        // console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const editTransactions = (body, params) => {
  return new Promise((resolve, reject) => {
    let query = "update transactions set ";
    const value = [];
    Object.keys(body).forEach((key, index, array) => {
      if (index === array.length - 1) {
        query += `${key} = $${index + 1} where id = $${index + 2} returning *`;
        value.push(body[key], params.id);
        return;
      }
      query += `${key} = $${index + 1},`;
      value.push(body[key]);
    });

    // Research
    // const query =
    //   "update transactions set tax = $2, payment_id = $3, delivery_id = $4, promo_id = $5, notes = $6, status = $7, updated_at = $8, total = $9, product_id = $10, size_id = $11, qty = $12, subtotal = $13 where transactions.id = $1 returning *";

    // let date = new Date();
    // let day = ("0" + date.getDate()).slice(-2);
    // let month = ("0" + (date.getMonth() + 1)).slice(-2);
    // let year = date.getFullYear();
    // let hours = date.getHours();
    // let minutes = date.getMinutes();
    // let seconds = date.getSeconds();

    // const updatedDate = `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;

    // const {
    //   tax,
    //   payment_id,
    //   delivery_id,
    //   promo_id,
    //   notes,
    //   status,
    //   total,
    //   product_id,
    //   size_id,
    //   qty,
    //   subtotal,
    // } = body;

    // const value = [
    //   params.id,
    //   tax,
    //   payment_id,
    //   delivery_id,
    //   promo_id,
    //   notes,
    //   status,
    //   updatedDate,
    //   total,
    //   product_id,
    //   size_id,
    //   qty,
    //   subtotal,
    // ];

    postgreDatabase.query(query, value, (error, result) => {
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
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const updateStatusTransactions = (status, params) => {
  return new Promise((resolve, reject) => {
    const query =
      "update transactions set status = $2, updated_at = $3 where id = $1 returning *";

    let date = new Date();
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    const updatedDate = `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;

    const values = [params.id, status, updatedDate];

    postgreDatabase.query(query, values, (error, result) => {
      console.log(values);
      if (error) {
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
  updateStatusTransactions,
};

module.exports = transactionsModel;
