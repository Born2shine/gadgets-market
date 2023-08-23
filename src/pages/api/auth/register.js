import { createRouter } from "next-connect";
import dbConnect from "@/backend/config/dbconfig";
import { getAllUsers, registerUser } from "@/backend/controllers/userContoller";

const router = createRouter();

dbConnect();

router.post(registerUser);
router.get(getAllUsers);

export default router.handler();
