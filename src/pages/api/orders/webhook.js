import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";

import onError from "@/backend/middlewares/errors";
import { isLoggedIN } from "@/backend/middlewares/auth";
import { webhook } from "@/backend/controllers/orderController";
const router = createRouter();

dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

router.post(webhook);

export default router.handler({ onError });
