import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date.now().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else
    ({
      error: "Unsurpported file Format please upload JPG/PNG/JPEG",
    }),
      false;
};

const upload = multer({
  storage,
  limit: { fieldSize: 1024 + 1024 },
  fileFilter,
});

export default upload;