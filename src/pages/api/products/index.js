import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";
import {
  createAllProducts,
  getAllProducts,
  newProduct,
} from "@/backend/controllers/productController";
import onError from "@/backend/middlewares/errors";
import { isLoggedIN } from "@/backend/middlewares/auth";

const router = createRouter();

dbConnect();

router.post(newProduct);
// router.post(createAllProducts);
router.use(isLoggedIN).get(getAllProducts);

export default router.handler({ onError });
