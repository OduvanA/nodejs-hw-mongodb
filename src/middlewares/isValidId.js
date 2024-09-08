import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    throw createHttpError(400, 'Bad request');
  }
  next();
};

export default isValidId;