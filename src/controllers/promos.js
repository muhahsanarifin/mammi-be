const {
  getPromos,
  createPromos,
  editPromos,
  dropPromos,
} = require("../model/promos");

const promosController = {
  get: async (req, res) => {
    try {
      const response = await getPromos(req.query);
      res.status(200).json({
        data: response.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  create: async (req, res) => {
    try {
      const response = await createPromos(req.body);
      console.table(response);
      res.status(201).json({
        message: `Promo was created successfully`,
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
      const response = await editPromos(req.body, req.params);
      console.table(response);
      res.status(200).json({
        message: `Promo was updated successfully`,
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
      const response = await dropPromos(req.params);
      console.table(response);
      res.status(200).json({
        message: `Promo was updated successfully`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
};

module.exports = promosController;
