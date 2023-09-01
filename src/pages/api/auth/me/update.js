import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";
import {
  getAllUsers,
  registerUser,
  updateUser,
} from "@/backend/controllers/userContoller";
import onError from "@/backend/middlewares/errors";
import { isLoggedIN } from "@/backend/middlewares/auth";
import upload from "@/backend/utils/multer";
const router = createRouter();

dbConnect();

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

const uploadMiddleware = upload.array("image");

router.use(isLoggedIN, uploadMiddleware).put(updateUser);

export default router.handler({ onError });
