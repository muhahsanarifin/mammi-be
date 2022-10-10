const {
  getProducts,
  filterCategoryProducts,
  sortingProducts,
  findProducts,
  createProducts,
  editProducts,
  dropProducts,
} = require("../model/products");

const productController = {
  get: async (req, res) => {
    try {
      const response = await getProducts();
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

  findProducts: async (req, res) => {
    try {
      const response = await findProducts();
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

  filter: async (req, res) => {
    console.log(req.query);
    try {
      const response = await filterCategoryProducts(req.query);
      return res.status(200).send({
        data: response.rows,
      });
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },

  sort: async (req, res) => {
    console.log(req.query);
    try {
      const response = await sortingProducts(req.query);
      res.status(200).send({
        data: response.rows,
      });
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },

  create: async (req, res) => {
    try {
      const response = await createProducts(req.body);
      res.status(201).send({
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  edit: async (req, res) => {
    try {
      const response = await editProducts(req.body, req.params);
      if (response.num == 1) {
        res.status(200).send({
          response,
          massage: "Product was updated successdully.",
        });
      }
      return res.send({
        message: `Cannot update product with id ${req.params.id}. Maybe product was not found or req.body is empty!`,
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
      res.status(200).send({
        data: response,
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
