import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";
import {
  getAllAddress,
  newAddress,
} from "@/backend/controllers/addressController";

const router = createRouter();

dbConnect();

router.post(newAddress);
router.get(getAllAddress);

export default router.handler();
