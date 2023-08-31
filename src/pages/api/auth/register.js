import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";
import { getAllUsers, registerUser } from "@/backend/controllers/userContoller";
import onError from "@/backend/middlewares/errors";
const router = createRouter();

dbConnect();

router.post(registerUser);
router.get(getAllUsers);

export default router.handler({ onError });
