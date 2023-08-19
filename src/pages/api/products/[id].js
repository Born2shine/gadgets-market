import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";
import { getProduct } from "@/backend/controllers/productController";

const router = createRouter();

dbConnect();

// router.post(newProduct);
router.get(getProduct);

export default router.handler();
