const { success, error } = require("../helpers/res");

const {
  getProducts,
  createProducts,
  updateProducts,
  dropProducts,
} = require("../model/products");

const productController = {
  get: async (req, res) => {
    try {
      const url = `${req.protocol}://localhost:8080/api/v1`;
      const response = await getProducts(req.query, url);
      success(res, 200, response);
    } catch (err) {
      error(res, 500, err.message);
    }
  },

  create: async (req, res) => {
    try {
      const response = await createProducts(req.body, req.file);
      res.status(200).json({
        data: response.rows,
        message: `Product was created successfully.`,
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
        const imageURL = `/images/${req.file.filename}`;
        req.body.image = imageURL;
      }
      const response = await updateProducts(req.body, req.params);
      res.status(200).json({
        data: response.rows,
        message: `Product was updated successfully.`,
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
        message: `Product was deleted successfully.`,
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
