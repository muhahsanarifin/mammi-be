const postgreDatabase = require("../config/postgre");

const getProducts = (queryParams, url) => {
  return new Promise((resolve, reject) => {
    let query;

    // Find all products
    query =
      "select p.id, p.product_name, p.price, c.category_name, p.image, p.created_at, p.updated_at, p.description, p.stock from products p left join categories c on p.category_id = c.id";

    let link = `${url}/products?`;

    if (queryParams.post === "oldest") {
      query =
        "select p.id, p.product_name, p.price, c.category_name, p.image, p.created_at, p.updated_at, p.description, p.stock from products p left join categories c on p.category_id = c.id order by p.created_at asc";
      link += `post=${queryParams.post}&`;

      if (queryParams.price === "low") {
        query =
          "select p.id, p.product_name, p.price, c.category_name, p.image, p.created_at, p.updated_at, p.description, p.stock from products p left join categories c on p.category_id = c.id order by p.created_at asc, p.price asc";
      }

      if (queryParams.price === "expensive") {
        query =
          "select p.id, p.product_name, p.price, c.category_name, p.image, p.created_at, p.updated_at, p.description, p.stock from products p left join categories c on p.category_id = c.id order by p.created_at asc, p.price desc";
      }
    }

    if (queryParams.post === "latest") {
      query =
        "select p.id, p.product_name, p.price, c.category_name, p.image, p.created_at, p.updated_at, p.description, p.stock from products p left join categories c on p.category_id = c.id order by p.created_at desc";
      link += `post=${queryParams.post}&`;

      if (queryParams.price === "low") {
        query =
          "select p.id, p.product_name, p.price, c.category_name, p.image, p.created_at, p.updated_at, p.description, p.stock from products p left join categories c on p.category_id = c.id order by p.created_at desc, p.price asc";
      }

      if (queryParams.price === "expensive") {
        query =
          "select p.id, p.product_name, p.price, c.category_name, p.image, p.created_at, p.updated_at, p.description, p.stock from products p left join categories c on p.category_id = c.id order by p.created_at desc, p.price desc";
      }
    }

    if (queryParams.price === "low") {
      query =
        "select p.id, p.product_name, p.price, c.category_name, p.image, p.created_at, p.updated_at, p.description, p.stock from products p left join categories c on p.category_id = c.id order by p.price asc";
      link += `price=${queryParams.price}&`;

      if (queryParams.post === "oldest") {
        query =
          "select p.id, p.product_name, p.price, c.category_name, p.image, p.created_at, p.updated_at, p.description, p.stock from products p left join categories c on p.category_id = c.id order by p.price asc, p.created_at asc";
      }

      if (queryParams.post === "latest") {
        query =
          "select p.id, p.product_name, p.price, c.category_name, p.image, p.created_at, p.updated_at, p.description, p.stock from products p left join categories c on p.category_id = c.id order by p.price asc, p.created_at desc";
      }
    }

    if (queryParams.price === "expensive") {
      query =
        "select p.id, p.product_name, p.price, c.category_name, p.image, p.created_at, p.updated_at, p.description, p.stock from products p left join categories c on p.category_id = c.id order by p.price desc";
      link += `price=${queryParams.price}&`;

      if (queryParams.post === "oldest") {
        query =
          "select p.id, p.product_name, p.price, c.category_name, p.image, p.created_at, p.updated_at, p.description, p.stock from products p left join categories c on p.category_id = c.id order by p.price desc, p.created_at asc";
      }

      if (queryParams.post === "latest") {
        query =
          "select p.id, p.product_name, p.price, c.category_name, p.image, p.created_at, p.updated_at, p.description, p.stock from products p left join categories c on p.category_id = c.id order by p.price desc, p.created_at desc";
      }
    }

    // Category Products
    if (queryParams.category) {
      query = `select p.id, p.product_name, p.price, c.category_name, p.image, p.created_at, p.updated_at, p.description, p.stock from products p left join categories c on p.category_id = c.id where c.category_name = '${queryParams.category}'`;
      link += `category=${queryParams.category}&`;

      if (queryParams.post === "latest") {
        query = `select p.id, p.product_name, p.price, c.category_name, p.image, p.created_at, p.updated_at, p.description, p.stock from products p left join categories c on p.category_id = c.id where c.category_name = '${queryParams.category}' order by p.created_at desc`;
      }

      if (queryParams.post === "oldest") {
        query = `select p.id, p.product_name, p.price, c.category_name, p.image, p.created_at, p.updated_at, p.description, p.stock from products p left join categories c on p.category_id = c.id where c.category_name = '${queryParams.category}' order by p.created_at asc`;
      }

      if (queryParams.price === "low") {
        query = `select p.id, p.product_name, p.price, c.category_name, p.image, p.created_at, p.updated_at, p.description, p.stock from products p left join categories c on p.category_id = c.id where c.category_name = '${queryParams.category}' order by p.price asc`;
      }

      if (queryParams.price === "expensive") {
        query = `select p.id, p.product_name, p.price, c.category_name, p.image, p.created_at, p.updated_at, p.description, p.stock from products p left join categories c on p.category_id = c.id where c.category_name = '${queryParams.category}' order by p.price desc`;
      }
    }

    if (queryParams.category === "Favorite") {
      query =
        "select p.id, p.product_name, p.price, p.image, p.created_at, p.updated_at from transactions t left join products p on t.product_id = p.id group by p.id, p.product_name, p.price, p.image";
      if (queryParams.price === "low") {
        query = `select p.id, p.product_name, p.price, p.image, p.created_at, p.updated_at from transactions t left join products p on t.product_id = p.id group by p.id, p.product_name, p.price, p.image order by p.price asc`;
      }
      if (queryParams.price === "expensive") {
        query = `select p.id, p.product_name, p.price, p.image, p.created_at, p.updated_at from transactions t left join products p on t.product_id = p.id group by p.id, p.product_name, p.price, p.image order by p.price desc`;
      }
      if (queryParams.post === "oldest") {
        query =
          "select p.id, p.product_name, p.price, p.image, p.created_at, p.updated_at from transactions t left join products p on t.product_id = p.id group by p.id, p.product_name, p.price, p.image order by p.created_at asc";
      }
      if (queryParams.post === "latest") {
        query =
          "select p.id, p.product_name, p.price, p.image, p.created_at, p.updated_at from transactions t left join products p on t.product_id = p.id group by p.id, p.product_name, p.price, p.image order by p.created_at desc";
      }
    }

    // Search
    if (queryParams.search) {
      query = `select p.id, p.product_name, p.price, c.category_name, p.image, p.created_at, p.updated_at, p.description, p.stock from products p left join categories c on p.category_id = c.id where lower(p.product_name) like lower('%${queryParams.search}%')`;
      link += `seacrh=${queryParams.search}&`;
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
      if (error) {
        return reject(error);
      }
      if (result.rows.length === 0)
        return reject({
          error: new Error("Product Not Found"),
          statusCode: 404,
        });
      // console.log("Result: ", result.rows.length);
      // console.log(query);
      postgreDatabase.query(queryLimit, values, (error, queryResult) => {
        if (error) {
          return reject(error);
        }
        if (queryResult.rows.length === 0)
          return reject({
            error: new Error("Product Not Found"),
            statusCode: 404,
          });
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

const getProduct = (queryParams) => {
  return new Promise((resolve, reject) => {
    const query =
      "select p.id, p.product_name, p.price, p.category_id, c.category_name, p.image, p.created_at, p.updated_at, p.description, p.stock from products p join categories c on p.category_id = c.id where p.id = $1";
    postgreDatabase.query(query, [queryParams.id], (error, result) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const createProducts = (body, file) => {
  return new Promise((resolve, reject) => {
    const query =
      "insert into products (product_name, price, category_id, image, created_at, updated_at, description, stock) values ($1,$2,$3,$4,$5,$6,$7,$8) returning *";
    const { product_name, price, category_id, image, description, stock } =
      body;

    let imageURL = file.secure_url;

    let date = new Date();
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    const currentDate = `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;

    const values = [
      product_name,
      price,
      category_id,
      imageURL,
      currentDate,
      currentDate,
      description,
      stock,
    ];
    postgreDatabase.query(query, values, (error, result) => {
      if (error) {
        console.log(error);
        reject(error);
      }
      resolve(result);
    });
  });
};

const updateProducts = (body, params) => {
  return new Promise((resolve, reject) => {
    const query =
      "update products set product_name = $2, price = $3, category_id = $4, image = $5, updated_at = $6, description = $7, stock = $8 where id = $1 returning *";

    const { product_name, price, category_id, image, description, stock } =
      body;

    let date = new Date();
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let updatedDate = `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;

    const value = [
      params.id,
      product_name,
      price,
      category_id,
      image,
      updatedDate,
      description,
      stock,
    ];

    postgreDatabase.query(query, value, (error, result) => {
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
  getProduct,
  createProducts,
  updateProducts,
  dropProducts,
};

module.exports = productsModel;
