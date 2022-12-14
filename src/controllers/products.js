const { success, error } = require("../helpers/response");

const {
  getProducts,
  getProduct,
  createProducts,
  updateProducts,
  dropProducts,
} = require("../model/products");

const productController = {
  gets: async (req, res) => {
    try {
      const url = `${req.protocol}://${req.hostname}/api/v1`;
      console.log(req.hostname);
      const response = await getProducts(req.query, url);
      success(res, 200, response);
    } catch (err) {
      error(res, 500, err.message);
    }
  },

  get: async (req, res) => {
    try {
      const response = await getProduct(req.params);
      // console.log(response);
      success(res, 200, response.rows);
    } catch (err) {
      error(res, 500, err.message);
    }
  },

  create: async (req, res) => {
    try {
      const response = await createProducts(req.body, req.file);
      res.status(200).json({
        result: response.rows,
        message: `Product created successfully.`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  update: async (req, res) => {
    try {
      if (req.file) {
        const imageURL = req.file.secure_url;
        req.body.image = imageURL;
      }
      const response = await updateProducts(req.body, req.params);
      res.status(200).json({
        result: response.rows,
        message: `Product updated successfully.`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  drop: async (req, res) => {
    try {
      const response = await dropProducts(req.params);
      console.log(response);
      res.status(200).json({
        message: `Product deleted successfully.`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
};

module.exports = productController;
