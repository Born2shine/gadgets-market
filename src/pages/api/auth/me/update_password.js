import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";
import { updatePassword } from "@/backend/controllers/userContoller";
import onError from "@/backend/middlewares/errors";
import { isLoggedIN } from "@/backend/middlewares/auth";
import upload from "@/backend/utils/multer";
const router = createRouter();

dbConnect();

router.use(isLoggedIN).put(updatePassword);

export default router.handler({ onError });
