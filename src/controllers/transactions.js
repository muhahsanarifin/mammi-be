const {
  getTransactions,
  createTransactions,
  getHistory,
  editTransactions,
  dropTransactions,
} = require("../model/transactions");

const transactionsController = {
  get: async (req, res) => {
    console.log(res);
    try {
      const response = await getTransactions(req.query);
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

  history: async (req, res) => {
    try {
      const response = await getHistory(req.params);
      res.status(200).send({
        data: response.rows,
      });
    } catch (error) {
      res.status(500).send({
        message: "internel server Error",
      });
    }
  },

  create: async (req, res) => {
    try {
      const response = await createTransactions(req.body);
      res.status(201).send({
        data: response.rows,
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
      const response = await editTransactions(req.body, req.params);
      console.log(response);
      res.status(200).send({
        message: "Transaction was updated successfully.",
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
      const response = await dropTransactions(req.params);
      console.log(response);
      res.status(200).send({
        message: "Transaction was deleted successfully.",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};

module.exports = transactionsController;
