const {
  getPromos,
  createPromos,
  editPromos,
  dropPromos,
} = require("../model/promos");

const promosController = {
  get: async (req, res) => {
    try {
      const response = await getPromos();
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
      const response = await createPromos(req.body);
      res.status(201).send({
        message: `Code voucher was created`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },

  edit: async (req, res) => {
    try {
      const response = await editPromos(req.body, req.params);
      console.log(response);
      res.status(200).send({
        message: `Promo discount was updated`,
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
      const response = await dropPromos(req.params);
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

module.exports = promosController;
