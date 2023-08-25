import catchAsync from "../utils/catchAsync";

const { getSession } = require("next-auth/react");
const { default: AppError } = require("../utils/errClass");

catchAsync;

const isLoggedIN = catchAsync(async (req, res, next) => {
  const session = await getSession({ req });

  console.log(session, "------------------");

  if (!session) {
    console.log(session);
    console.log("its not working ooooo");
    // res.status(401).json({ message: "not allowed" });
    // await next(new AppError("please do log in to gain access", 401));
    throw new AppError("please do log in to gain access", 401);
  }

  //   req.user = session.user;

  next();
});

export { isLoggedIN };
