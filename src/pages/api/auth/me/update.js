import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";
import { updateUser } from "@/backend/controllers/userContoller";
import onError from "@/backend/middlewares/errors";
import multer from "multer";
import { isLoggedIN } from "@/backend/middlewares/auth";
// import upload from "@/backend/utils/multer";
import { formData } from "@/backend/middlewares/formData";
const router = createRouter();

dbConnect();

const upload = multer({
  dest: "public/images/users",
  limits: { fieldSize: 1024 * 1024 },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

//.use(uploadMiddleware)

const uploadMiddleware = upload.any("image");

router.use(isLoggedIN, uploadMiddleware).put(updateUser);

export default router.handler({ onError });
