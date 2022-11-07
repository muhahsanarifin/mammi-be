const express = require("express");

const productsRouter = express.Router();

const { gets, get, create, update, drop } = require("../controllers/products");

// const {
//   diskUpload,
//   memoryUpload,
//   errorHandler,
// } = require("../middlewares/uploadImages");

const isLogin = require("../middlewares/isLogin");
const allowedRoles = require("../middlewares/allowedRoles");
// const validate = require("../middlewares/validate");
// const cloudinaryUploader = require("../middlewares/cloudinary");
// const upload = require("../middlewares/uploadImages");

const { diskUpload } = require("../middlewares/uploadImages");

// GET ↴
productsRouter.get("/", gets);

// productsRouter.get("/", isLogin(), allowedRoles("Admin", "Customer"), gets);

productsRouter.get("/:id", get);

// POST ↴
productsRouter.post("/", diskUpload.single("image"), create);

// productsRouter.post(
//   "/",
//   isLogin(),
//   allowedRoles("Admin"),
//   diskUpload.single("image"),
//   create
// );

// productsRouter.post(
//   "/",
//   isLogin(),
//   allowedRoles("Admin"),
//   (req, res, next) =>
//     memoryUpload.single("image")(req, res, (err) => {
//       errorHandler(err, res, next);
//     }),
//   cloudinaryUploader,
//   (req, res) => {
//     console.log(res);
//     res.status(
//       200,
//       json({
//         message: "Upload Success",
//         data: {
//           url: req.file.url,
//           secure: req.file.secure_url,
//         },
//       })
//     );
//   },
//   create
// );

// PATCH ↴

productsRouter.patch("/:id", diskUpload.single("image"), update);

// productsRouter.patch(
//   "/:id",
//   isLogin(),
//   allowedRoles("Admin"),
//   diskUpload.single("image"),
//   update
// );

// DELETE ↴
productsRouter.delete("/:id", drop);

// productsRouter.delete("/:id", isLogin(), allowedRoles("Admin"), drop);

module.exports = productsRouter;
