import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../middlewares/validateBody.js";
import { userSigninSchema, userSignupSchema } from "../validation/users.js";
import * as authControllers from "../controllers/auth.js";

const authRouter = Router();

authRouter.post('/signup',
  validateBody(userSignupSchema),
  ctrlWrapper(authControllers.signupController));

authRouter.post('/signin',
  validateBody(userSigninSchema),
  ctrlWrapper(authControllers.signinController));

export default authRouter;