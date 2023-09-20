import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";

import onError from "@/backend/middlewares/errors";
import { authorizeRole, isLoggedIN } from "@/backend/middlewares/auth";

import { getAllUsers } from "@/backend/controllers/authControllers";

const router = createRouter();

dbConnect();

router.use(isLoggedIN, authorizeRole("admin")).get(getAllUsers);

export default router.handler({ onError });
