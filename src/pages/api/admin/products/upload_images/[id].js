import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";
import { updateUser } from "@/backend/controllers/userContoller";
import onError from "@/backend/middlewares/errors";
import { authorizeRole, isLoggedIN } from "@/backend/middlewares/auth";
import multer from "multer";
import { uploadProductImages } from "@/backend/controllers/productController";
// import upload from "@/backend/utils/multer";
const router = createRouter();

dbConnect();

const upload = multer({
  dest: "public/images/products",
  // limits: { fieldSize: 1024 * 1024 },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadMiddleware = upload.array("image", 3);

router
  .use(isLoggedIN, uploadMiddleware, authorizeRole("admin"))
  .post(uploadProductImages);

export default router.handler({ onError });
