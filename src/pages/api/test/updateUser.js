import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";
import { updateUser } from "@/backend/controllers/userContoller";
import onError from "@/backend/middlewares/errors";
import multer from "multer";
import { isLoggedIN } from "@/backend/middlewares/auth";
// import upload from "@/backend/utils/multer";
import { formData } from "@/backend/middlewares/formData";
import { resizePhoto } from "@/backend/middlewares/resizeImage";
const router = createRouter();

export const config = {
  api: {
    bodyParser: false,
  },
};

dbConnect();

// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/images/users");
//   },
//   filename: function (req, file, cb) {
//     cb(null, new Date().toISOString() + "-" + file.originalname);
//   },
// });

const storage = multer.memoryStorage();
//limits: { fieldSize: 1024 * 1024, fileSize: 500 },

const upload = multer({
  storage: storage,
});

//.use(uploadMiddleware)

const uploadMiddleware = upload.single("file");

router.use(uploadMiddleware, resizePhoto).put(updateUser);

export default router.handler({ onError });
