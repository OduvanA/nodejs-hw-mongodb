import createHttpError from "http-errors";

import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import SessionCollection from "../db/models/Session.js";
import { FIFTEEN_MINUTES, ONE_DAY } from "../constants/index.js";
import UsersCollection from "../db/models/User.js";

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + ONE_DAY);
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  };
};

export const signup = async (payload) => {
  const {email, password} = payload;
  const user = await UsersCollection.findOne({email});
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(password, 10);
  return await UsersCollection.create({ ...payload, password: encryptedPassword, });
};

export const signin = async (payload) => {
  const {email, password} = payload;
  const user = await UsersCollection.findOne({email});
  if (!user) throw createHttpError(409, 'User is not found');

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const sessionData = createSession();
  return await SessionCollection.create({
    userId: user._id,
    ...sessionData,
  });
};

export const signout = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const refreshSession = async ({ sessionId, refreshToken }) => {
  const oldSession = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!oldSession) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > oldSession.refreshTokenValidUntil) {
    throw createHttpError(401, 'Session token is expired');
  }

  const newSession = createSession();
  await SessionCollection.deleteOne({ _id: sessionId });

  return await SessionCollection.create({
    userId: oldSession._id,
    ...newSession,
  });
};