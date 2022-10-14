const {
  getTransactions,
  // createTransactions,
  editTransactions,
  dropTransactions,
} = require("../model/transactions");

const transactionsController = {
  get: async (req, res) => {
    console.log(res);
    try {
      const response = await getTransactions();
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

  // create: async (req, res) => {
  //   try {
  //     const response = await createTransactions(req.body);
  //     res.status(201).send({
  //       data: response,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send({
  //       msg: "Internal Server Error",
  //     });
  //   }
  // },

  edit: async (req, res) => {
    try {
      const response = await editTransactions(req.body, req.params);
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
      const response = await dropTransactions(req.params);
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

module.exports = transactionsController;
