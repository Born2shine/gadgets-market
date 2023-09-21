import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";

import onError from "@/backend/middlewares/errors";
import { isLoggedIN } from "@/backend/middlewares/auth";
import { canReview } from "@/backend/controllers/orderController";
const router = createRouter();

dbConnect();

router.use(isLoggedIN).get(canReview);

export default router.handler({ onError });
