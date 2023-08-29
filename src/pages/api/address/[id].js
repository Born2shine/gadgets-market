import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";
import {
  deleteAddress,
  getAddress,
  updateAddress,
} from "@/backend/controllers/addressController";
import onError from "@/backend/middlewares/errors";
import { isLoggedIN } from "@/backend/middlewares/auth";

const router = createRouter();

dbConnect();

router.use(isLoggedIN).get(getAddress);
router.use(isLoggedIN).put(updateAddress);
router.use(isLoggedIN).delete(deleteAddress);

export default router.handler({ onError });
