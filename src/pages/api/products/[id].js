import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";
import { getProduct } from "@/backend/controllers/productController";
import onError from "@/backend/middlewares/errors";

const router = createRouter();

dbConnect();

// router.post(newProduct);
router.get(getProduct);

export default router.handler({ onError });
