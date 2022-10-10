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
        msg: "Internal Server Error",
      });
    }
  },

  create: async (req, res) => {
    try {
      const response = await createPromos(req.body);
      res.status(201).send({
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        msg: "Internal Server Error",
      });
    }
  },

  edit: async (req, res) => {
    try {
      const response = await editPromos(req.body, req.params);
      res.status(200).send({
        data: response,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        msg: "Internal Server Error",
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
        msg: "Internal Server Error",
      });
    }
  },
};

module.exports = promosController;
