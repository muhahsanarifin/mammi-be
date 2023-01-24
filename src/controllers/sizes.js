const { success, error } = require("../helpers/response");

const {
  getSizes,
  getSize,
  createSize,
  editSize,
  dropSize,
} = require("../model/sizes");

const sizesController = {
  get: async (req, res) => {
    try {
      const response = await getSizes();
      success(res, 200, response.rows);
    } catch (err) {
      error(res, 500, err.message);
    }
  },

  getById: async (req, res) => {
    try {
      const response = await getSize(req.params);
      success(res, 200, response.rows);
    } catch (err) {
      error(res, 500, err.message);
    }
  },

  create: async (req, res) => {
    try {
      const response = await createSize(req.body);
      console.log(response);
      res.status(201).json({
        msg: `Size created successfully`,
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
      const response = await editSize(req.body, req.params);
      console.log(response);
      res.status(200).json({
        result: response.rows,
        msg: `Size updated successfully`,
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
      const response = await dropSize(req.params);
      console.log(response);
      res.status(200).json({
        msg: `Size updated successfully`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  },
};

module.exports = sizesController;
