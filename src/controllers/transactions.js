const { success, error } = require("../helpers/res");

const {
  getTransactions,
  createTransactions,
  getHistory,
  editTransactions,
  dropTransactions,
} = require("../model/transactions");

const transactionsController = {
  get: async (req, res) => {
    try {
      const url = `${req.protocol}://localhost:8080/api/v1`;
      const response = await getTransactions(req.query, url);
      success(res, 200, response);
    } catch (err) {
      error(res, 500, err.message);
    }
  },

  history: async (req, res) => {
    try {
      const response = await getHistory(req.params);
      res.status(200).json({
        data: response.rows,
      });
    } catch (error) {
      res.status(500).json({
        message: "internel server Error",
      });
    }
  },

  create: async (req, res) => {
    try {
      const response = await createTransactions(req.body);
      console.log(response);
      res.status(201).json({
        data: response.rows,
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
      const response = await editTransactions(req.body, req.params);
      console.table(response);
      res.status(200).json({
        message: "Transaction was updated successfully.",
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  drop: async (req, res) => {
    try {
      const response = await dropTransactions(req.params);
      console.table(response);
      res.status(200).json({
        message: "Transaction was deleted successfully.",
      });
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  },
};

module.exports = transactionsController;
