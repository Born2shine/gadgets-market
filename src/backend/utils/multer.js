import multer from "multer";
import { ApiError } from "next/dist/server/api-utils";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("multer=============", req.files);
    cb(null, "public/images/users");
    console.log("multer=============");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
    console.log("multer============= filefilter");
  } else {
    cb(new ApiError(400, "unsupported file format"), false);
  }
};

const upload = multer({
  storage,
  // limits: { fieldSize: 1024 * 1024 },
  fileFilter,
});

export default upload;
