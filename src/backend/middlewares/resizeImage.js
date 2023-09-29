import sharp from "sharp";

const resizeUserPhoto = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 98 })
    .toFile(`public/images/users/${req.file.filename}`);

  req.file.path = `public/images/users/${req.file.filename}`;
  next();
};

const resizeProductPhoto = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  req.file.filename = `product-${req.query.id}-${Date.now()}.jpeg`;

  const file = await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 98 })
    .toFile(`public/images/products/${req.file.filename}`);
  console.log(file);

  req.file.path = `public/images/products/${req.file.filename}`;

  next();
};

export { resizeUserPhoto, resizeProductPhoto };

// xmmrhnnH4Jk17vn2
