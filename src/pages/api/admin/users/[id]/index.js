import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";

import onError from "@/backend/middlewares/errors";
import { authorizeRole, isLoggedIN } from "@/backend/middlewares/auth";

import {
  deleteUser,
  getUser,
  updateUser,
} from "@/backend/controllers/authControllers";

const router = createRouter();

dbConnect();

router.use(isLoggedIN, authorizeRole("admin")).get(getUser);
router.use(isLoggedIN, authorizeRole("admin")).put(updateUser);
router.use(isLoggedIN, authorizeRole("admin")).delete(deleteUser);

export default router.handler({ onError });
