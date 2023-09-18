import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";

import onError from "@/backend/middlewares/errors";
import { authorizeRole, isLoggedIN } from "@/backend/middlewares/auth";

import {
  deleteProduct,
  updateProduct,
  uploadProductImages,
} from "@/backend/controllers/productController";
// import upload from "@/backend/utils/multer";
const router = createRouter();

dbConnect();

router.use(isLoggedIN, authorizeRole("admin")).put(updateProduct);
router.use(isLoggedIN, authorizeRole("admin")).delete(deleteProduct);

export default router.handler({ onError });
