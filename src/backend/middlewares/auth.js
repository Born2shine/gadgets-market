import { getToken } from "next-auth/jwt";
import catchAsync from "../utils/catchAsync";

const { getSession } = require("next-auth/react");

const { default: AppError } = require("../utils/errClass");

catchAsync;

const isLoggedIN = catchAsync(async (req, res, next) => {
  // const session = await getSession({ req });
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    console.log(session);
    console.log("its not working ooooo");
    // res.status(401).json({ message: "not allowed" });
    // return next(new AppError("please do log in to gain access", 401));
    return res
      .status(401)
      .json({ message: "please login to access this page" });
  }

  req.user = session.user;

  // console.log(req.user);

  next();
});

export { isLoggedIN };
