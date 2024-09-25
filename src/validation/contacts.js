import Joi from "joi";
import { contactTypeList } from "../constants/contacts.js";
import { phoneRegexp } from "../constants/index.js";

export const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().trim().pattern(phoneRegexp).required(),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...contactTypeList).required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().trim().pattern(phoneRegexp),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...contactTypeList),
});