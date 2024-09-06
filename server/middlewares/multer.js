import multer from "multer";

let storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "./uploads");
  // },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

export default upload;
