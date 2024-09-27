import Joi from "joi";
import { emailRegexp } from "../constants/index.js";

export const requestResetEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});