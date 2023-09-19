import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";

import onError from "@/backend/middlewares/errors";
import { authorizeRole, isLoggedIN } from "@/backend/middlewares/auth";
import { getAllOrders } from "@/backend/controllers/orderController";

const router = createRouter();

dbConnect();

router.use(isLoggedIN, authorizeRole("admin")).get(getAllOrders);

export default router.handler({ onError });
