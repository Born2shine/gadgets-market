import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";
import { createProductReview } from "@/backend/controllers/productController";
import onError from "@/backend/middlewares/errors";
import { isLoggedIN } from "@/backend/middlewares/auth";

const router = createRouter();

dbConnect();

router.use(isLoggedIN).put(createProductReview);

export default router.handler({ onError });
