import { getToken } from "next-auth/jwt";
import catchAsync from "../utils/catchAsync";

const { getSession } = require("next-auth/react");

const { default: AppError } = require("../utils/errClass");

catchAsync;

const isLoggedIN = async (req, res, next) => {
  // const session = await getSession({ req });
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    console.log(session);
    console.log("you are not logged in ooooo");

    // await next(new AppError("please login to access this page", 401));

    return res
      .status(401)
      .json({ message: "please login to access this page" });
  }

  req.user = session.user;

  // console.log(req.user);

  next();
};

export { isLoggedIN };
