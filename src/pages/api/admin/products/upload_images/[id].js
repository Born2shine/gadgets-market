import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";
import { updateUser } from "@/backend/controllers/userContoller";
import onError from "@/backend/middlewares/errors";
import { authorizeRole, isLoggedIN } from "@/backend/middlewares/auth";
import multer from "multer";
import { uploadProductImages } from "@/backend/controllers/productController";
import { resizeProductPhoto } from "@/backend/middlewares/resizeImage";
// import upload from "@/backend/utils/multer";
const router = createRouter();

export const config = {
  api: {
    bodyParser: false,
  },
};

dbConnect();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

const uploadMiddleware = upload.single("image");

router
  .use(isLoggedIN, authorizeRole("admin"), uploadMiddleware, resizeProductPhoto)
  .post(uploadProductImages);

export default router.handler({ onError });
