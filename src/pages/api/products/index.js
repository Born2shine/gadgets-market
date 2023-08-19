import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";
import {
  createAllProducts,
  getAllProducts,
  newProduct,
} from "@/backend/controllers/productController";

const router = createRouter();

dbConnect();

router.post(newProduct);
// router.post(createAllProducts);
router.get(getAllProducts);

export default router.handler();
