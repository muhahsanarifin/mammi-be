const { success, error } = require("../helpers/response");

const {
  getPromos,
  getPromo,
  createPromos,
  editPromos,
  dropPromos,
} = require("../model/promos");

const promosController = {
  get: async (req, res) => {
    try {
      const url = `${req.protocol}://${req.hostname}/api/v1`;
      const response = await getPromos(req.query, url);
      success(res, 200, response);
    } catch (err) {
      error(res, 500, err.message);
    }
  },

  getById: async (req, res) => {
    try {
      const response = await getPromo(req.params);
      success(res, 200, response.rows);
    } catch (err) {
      error(res, 500, err.message);
    }
  },

  create: async (req, res) => {
    try {
      const response = await createPromos(req.body);
      console.log(response);
      res.status(201).json({
        msg: `Promo created successfully`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  },

  edit: async (req, res) => {
    try {
      const response = await editPromos(req.body, req.params);
      console.log(response);
      res.status(200).json({
        result: response.rows,
        msg: `Promo updated successfully`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  },

  drop: async (req, res) => {
    try {
      const response = await dropPromos(req.params);
      console.log(response);
      res.status(200).json({
        msg: `Promo updated successfully`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  },
};

module.exports = promosController;
