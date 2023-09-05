import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";

import onError from "@/backend/middlewares/errors";
import { isLoggedIN } from "@/backend/middlewares/auth";
import { checkoutSession } from "@/backend/controllers/orderController";
const router = createRouter();

dbConnect();

router.use(isLoggedIN).post(checkoutSession);

export default router.handler({ onError });
