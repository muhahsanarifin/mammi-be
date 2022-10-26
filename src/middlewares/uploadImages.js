const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
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

let upload = multer({
  storage: storage,
  limits: {
    fileSize: 204800, // Maximum file size 200kb
  },
  fileFilter: (req, file, cb) => {
    let fileTypes = /jpeg|jpg|png|gif/;

    const extName = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      return cb(null, true);
    } else {
      cb("Format image must png, jpg, jpeg, gip");
    }
  },
}).single("image");

module.exports = upload;
