/* eslint-disable prettier/prettier */
const {
  getProducts,
  productPages,
  createProducts,
  updateProducts,
  dropProducts,
} = require("../model/products");

const productController = {
  get: async (req, res) => {
    try {
      const response = await getProducts(req.query);
      res.status(200).send({
        data: response.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },

  pages: async (req, res) => {
    try {
      const response = await productPages(req.query);
      res.status(200).send({
        data: response.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },

  create: async (req, res) => {
    try {
      const response = await createProducts(req.body, req.file);
      res.status(200).send({
        data: response.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },

  update: async (req, res) => {
    try {
      const response = await updateProducts(req.body, req.params);
      res.status(200).send({
        data: response.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },

  drop: async (req, res) => {
    try {
      const response = await dropProducts(req.params);
      res.status(200).send({
        data: response.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};

module.exports = productController;
