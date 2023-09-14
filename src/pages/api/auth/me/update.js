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

const upload = multer({ dest: "public/images/users" });

export const config = {
  api: {
    bodyParser: false,
  },
};

//.use(uploadMiddleware)

const uploadMiddleware = upload.array("image");

router.use(isLoggedIN, uploadMiddleware).put(updateUser);

export default router.handler({ onError });
