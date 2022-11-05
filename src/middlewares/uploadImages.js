const multer = require("multer");
const path = require("path");

const limits = {
  fileSize: 204800,
};
const fileFilter = (req, file, cb) => {
  const extName = path.extname(file.originalname);
  const allowedExt = /jpeg|jpg|png|gif/;
  if (!allowedExt.test(extName))
    return cb(
      new Error("Only use allowed extension (JPEG,JPG, PNG, GIF)"),
      false
    );
  cb(null, true);
};

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    const suffix = `${Date.now()}-${Math.round(Math.random() * 1e3)}`;
    const extName = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${suffix}${extName}`;
    cb(null, fileName);
  },
});

const diskUpload = multer({
  storage: diskStorage,
  limits,
  fileFilter,
});

const memoryStorage = multer.memoryStorage();

const memoryUpload = multer({
  storage: memoryStorage,
  limits,
  fileFilter,
});

const errorHandler = (err, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).json({
      status: "Upload Error",
      message: err.message,
    });
  }
  if (err) {
    return res
      .status(500)
      .json({ status: "Internal Server Error", message: err.message });
  }
  console.log("Upload Sucess");
  next();
};

module.exports = { diskUpload, memoryUpload, errorHandler };
