import sharp from "sharp";

const resizePhoto = (req, res, next) => {
  console.log("ENTERS");
  if (!req.file) {
    return next();
  }
  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;
  console.log("sharp------>", re.file);
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 98 })
    .toFile(`public/images/users/${req.file.filename}`);

  next();
};

export { resizePhoto };
