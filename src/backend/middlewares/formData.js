const { ApiError } = require("next/dist/server/api-utils");
import formidable from "formidable";

const formData = async (req, res, next) => {
  const data = await new Promise((resolve, reject) => {
    const form = formidable({});
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject({ err });
        return;
      }
      resolve({ err, fields, files });
    });
  });

  //   console.log(data);

  if (!data) {
    return next(
      new ApiError(400, "request failed, please fill all required forms")
    );
  }
  console.log(data.files.image);
  req.body = data.fields;
  req.files = data.files;

  next();
};

export { formData };
