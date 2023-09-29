import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";
import {
  deleteAllAddress,
  getAllAddress,
  newAddress,
} from "@/backend/controllers/addressController";
import onError from "@/backend/middlewares/errors";
import { isLoggedIN } from "@/backend/middlewares/auth";

const router = createRouter();

dbConnect();

// export const config = {
//   api: {
//     externalResolver: true,
//     bodyParser: false,
//   },
// };

export const api = {
  externalResolver: true,
};

router.use(isLoggedIN).post(newAddress);
router.use(isLoggedIN).get(getAllAddress);
router.delete(deleteAllAddress);

export default router.handler({ onError });
