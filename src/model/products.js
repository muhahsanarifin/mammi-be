const postgreDatabase = require("../config/postgre");

// Get Products ↴ // ◔ On progress
const getProducts = (queryParams, url) => {
  return new Promise((resolve, reject) => {
    // Find all products ↴
    let query =
      "select p.id, p.product_name, c.category_name, p.image, p.created_at, p.updated_at, p.price from products p join categories c on p.category_id = c.id";

    let link = `${url}/products?`;

    // Filter products ↴
    if (queryParams.post == "latest") {
      query += ` order by p.created_at desc`;
      link += ` post=${queryParams.post}&`;
    }

    if (queryParams.post == "oldest") {
      query += ` order by p.created_at asc`;
      link += ` post=${queryParams.post}&`;
    }

    if (queryParams.price == "low") {
      query += ` order by p.price asc`;
      link += ` price=${queryParams.price}&`;
    }

    if (queryParams.price == "expensive") {
      query += ` order by p.price desc`;
      link += ` price=${queryParams.price}&`;
    }

    if (queryParams.favorite == "true") {
      query =
        "select products.product_name, products.price, products.image, transactions.status, qty from transactions_product_size join transactions on transactions_product_size.transaction_id = transactions.id join products on transactions_product_size.product_id = products.id join sizes on transactions_product_size.size_id = sizes.id";
      link += ` favorite=${queryParams.favorite}&`;
    }

    // Search  Category Products ↴
    if (queryParams.filter) {
      query += ` where lower(c.category_name) like lower('%${queryParams.filter}%')`;
      link += ` filter=${queryParams.filter}&`;
    }

    // Search Products ↴ // ◔ On progress
    if (queryParams.search) {
      query += ` where lower(p.product_name) like lower('%${queryParams.search}%')`;
      link += ` seacrh=${queryParams.search}&`;
    }

    let queryLimit = "";
    let values = [];

    if (queryParams.page && queryParams.limit) {
      let page = Number(queryParams.page);
      let limit = Number(queryParams.limit);
      let offset = (page - 1) * limit;
      queryLimit = query + ` order by p.id limit $1 offset $2`;
      values.push(limit, offset);
    } else {
      queryLimit = query;
    }

    postgreDatabase.query(query, (error, result) => {
      postgreDatabase.query(queryLimit, values, (error, queryResult) => {
        if (error) {
          return reject(error);
        }
        if (queryResult.rows.length == 0)
          return reject(new Error("Product Not Found"));
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

// Create Products ↴
const createProducts = (body, file) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into products (product_name, category_id, image, price) values ($1,$2,$3,$4) returning *";
    const { product_name, category_id, price } = body;
    const imageURL = `/images/${file.filename}`;
    const values = [product_name, category_id, imageURL, price];
    postgreDatabase.query(query, values, (error, result) => {
      if (error) {
        console.log(error);
        reject(error);
      }
      resolve(result);
    });
  });
};

// Updated Products ↴
const updateProducts = (body, params) => {
  return new Promise((resolve, reject) => {
    let query = "update products set ";
    const data = [];

    Object.keys(body).forEach((key, index, array) => {
      if (index === array.length - 1) {
        query += `${key} = $${index + 1} where products.id = $${
          index + 2
        } returning *`;
        data.push(body[key], params.id);
        return;
      }
      query += `${key} = $${index + 1},`;
      data.push(body[key]);
    });
    postgreDatabase.query(query, data, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const dropProducts = (params) => {
  return new Promise((resolve, reject) => {
    const query = "delete from products where id = $1";
    postgreDatabase.query(query, [params.id], (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const productsModel = {
  getProducts,
  createProducts,
  updateProducts,
  dropProducts,
};

module.exports = productsModel;
