const { success, error } = require("../helpers/response");

const {
  getDeliveries,
  getDelivery,
  createDelivery,
  editDelivery,
  dropDelivery,
} = require("../model/deliveries");

const deliveriesController = {
  get: async (req, res) => {
    try {
      const response = await getDeliveries();
      success(res, 200, response.rows);
    } catch (err) {
      error(res, 500, err.message);
    }
  },

  getById: async (req, res) => {
    try {
      const response = await getDelivery(req.params);
      success(res, 200, response.rows);
    } catch (err) {
      error(res, 500, err.message);
    }
  },

  create: async (req, res) => {
    try {
      const response = await createDelivery(req.body);
      console.log(response);
      res.status(201).json({
        msg: `Delivery created successfully`,
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
      const response = await editDelivery(req.body, req.params);
      console.log(response);
      res.status(200).json({
        result: response.rows,
        msg: `Delivery updated successfully`,
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
      const response = await dropDelivery(req.params);
      console.log(response);
      res.status(200).json({
        msg: `Delivery updated successfully`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  },
};

module.exports = deliveriesController;
