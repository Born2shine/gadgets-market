import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";
import { updateUser } from "@/backend/controllers/userContoller";
import onError from "@/backend/middlewares/errors";
import { isLoggedIN } from "@/backend/middlewares/auth";
import upload from "@/backend/utils/multer";
const router = createRouter();

dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.single("image");

router.use(uploadMiddleware).put(updateUser);

export default router.handler({ onError });
