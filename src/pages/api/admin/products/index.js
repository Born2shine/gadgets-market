import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";

import onError from "@/backend/middlewares/errors";
import { authorizeRole, isLoggedIN } from "@/backend/middlewares/auth";
import { newProduct } from "@/backend/controllers/productController";

const router = createRouter();

dbConnect();

router.use(isLoggedIN, authorizeRole("admin")).post(newProduct);

export default router.handler({ onError });
