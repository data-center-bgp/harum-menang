import express, { Request, Response, NextFunction } from "express";
import { PrismaService } from "../prisma.service";
import { UserAuth } from "./user.auth.service";
import { UserService } from "./user.service";
import { ChangePassword } from "./user.interface";
import { UserGuard } from "./user.guard";

const prismaService = new PrismaService();
const userAuth = new UserAuth(prismaService);
const userService = new UserService(prismaService);
const userRouter = express.Router();
const userGuard = new UserGuard();

interface CustomRequest extends Request {
  id: number;
}

const authenticationMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = String(
      req.headers["authorization"]?.split(" ")[1].replace("'", "")
    );
    const checkToken = userGuard.authentication(token);
    if (checkToken) {
      req.id = checkToken.id;
      next();
    } else {
      res.status(401).json("Invalid token!");
    }
  } catch (err) {
    req.id = 0;
    res.status(500).json("Error authenticating!");
  }
};

const authorizationMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = String(
      req.headers["authorization"]?.split(" ")[1].replace("'", "")
    );
    const checkToken = userGuard.authentication(token);
    if (checkToken) {
      const checkAuthorization = userGuard.authorization(req.id, token);
      if (checkAuthorization) {
        next();
      } else {
        res.status(403).json("Unauthorized!");
      }
    } else {
      res.status(401).json("Invalid token!");
    }
  } catch (err) {
    res.status(500).json("Server error!");
  }
};

// REGISTER USER
userRouter.post("/auth/register", async (req: CustomRequest, res: Response) => {
  try {
    const response = await userAuth.register(req.body);
    res.status(response.code).json(response.response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN USER
userRouter.post("/auth/login", async (req: CustomRequest, res: Response) => {
  try {
    const response = await userAuth.login(req.body);
    res.status(response.code).json(response.response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CHANGE PASSWORD
userRouter.patch(
  "/auth/change-password/:id",
  authenticationMiddleware,
  authorizationMiddleware,
  async (req: CustomRequest, res: Response) => {
    try {
      const id = req.params.id;
      const data: ChangePassword = req.body;
      const response = await userAuth.changePassword(id, data);
      if (response) {
        res.status(response.code).json(response.response);
      } else {
        res.status(500).json("Error occurred while changing password.");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

export { userRouter }