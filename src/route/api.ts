import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware)

apiRouter.delete("/api/users/current", UserController.logout)
apiRouter.patch("/api/users/current", UserController.update)
apiRouter.delete("/api/users/delete", UserController.delete)
apiRouter.get("/api/users/current", UserController.get)