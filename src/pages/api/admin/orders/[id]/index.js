import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";

import onError from "@/backend/middlewares/errors";
import { authorizeRole, isLoggedIN } from "@/backend/middlewares/auth";

import { getOrder } from "@/backend/controllers/orderController";

const router = createRouter();

dbConnect();

// router.use(isLoggedIN, authorizeRole("admin")).put(updateProduct);
// router.use(isLoggedIN, authorizeRole("admin")).delete(deleteProduct);
router.use(isLoggedIN, authorizeRole("admin")).get(getOrder);
export default router.handler({ onError });
