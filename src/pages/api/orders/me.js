import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";

import onError from "@/backend/middlewares/errors";
import { isLoggedIN } from "@/backend/middlewares/auth";
import { myOrders } from "@/backend/controllers/orderController";
const router = createRouter();

dbConnect();

router.use(isLoggedIN).get(myOrders);

export default router.handler({ onError });
