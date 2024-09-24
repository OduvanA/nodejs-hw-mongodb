import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../middlewares/validateBody.js";
import { userSigninSchema, userSignupSchema } from "../validation/users.js";
import * as authControllers from "../controllers/auth.js";

const authRouter = Router();

authRouter.post('/register',
  validateBody(userSignupSchema),
  ctrlWrapper(authControllers.signupController));

authRouter.post('/login',
  validateBody(userSigninSchema),
  ctrlWrapper(authControllers.signinController));

authRouter.post('/logout',
  ctrlWrapper(authControllers.signoutController));

authRouter.post('/refresh',
  ctrlWrapper(authControllers.refreshSessionController));

export default authRouter;