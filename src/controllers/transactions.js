const { success, error } = require("../helpers/response");

const {
  getTransactions,
  createTransactions,
  getHistory,
  getDataDashboard,
  editTransactions,
  dropTransactions,
  updateStatusTransactions,
} = require("../model/transactions");

const transactionsController = {
  get: async (req, res) => {
    try {
      const url = `${req.protocol === "https" || req.protocol}://${
        req.hostname
      }/api/v1`;
      const response = await getTransactions(req.query, url);
      success(res, 200, response);
    } catch (objErr) {
      const statusCode = objErr.statusCode || 500;
      error(res, statusCode, { msg: objErr.error.message });
    }
  },

  history: async (req, res) => {
    try {
      const response = await getHistory(req.userPayload.id); // ⇦ request userPayload
      res.status(200).json({
        result: response.rows,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  },

  dataDashboard: async (req, res) => {
    try {
      const response = await getDataDashboard();
      res.status(200).json({
        data: response.rows,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  },

  create: async (req, res) => {
    try {
      const response = await createTransactions(req.body, req.userPayload.id); // ⇦ request userPayload
      console.log(response);
      success(res, 200, response.rows, "Transaction successfully.");
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  },

  edit: async (req, res) => {
    try {
      const response = await editTransactions(req.body, req.params);
      console.log(response);
      res.status(200).json({
        data: response.rows,
        msg: "Update transaction successfully.",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  },

  drop: async (req, res) => {
    try {
      const response = await dropTransactions(req.params);
      console.log(response);
      res.status(200).json({
        msg: "Delete transaction successfully.",
      });
    } catch (error) {
      res.status(500).send({
        msg: "Internal Server Error",
      });
    }
  },

  updateStatus: async (req, res) => {
    const { status } = req.body;
    try {
      const response = await updateStatusTransactions(status, req.params);
      console.log(response);
      res.status(200).json({
        data: { status: response.rows[0].status },
        msg: "Update status transaction successfully.",
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  },
};

module.exports = transactionsController;
