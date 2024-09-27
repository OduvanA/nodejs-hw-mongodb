import createHttpError from "http-errors";
import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import handlebars from "handlebars";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import SessionCollection from "../db/models/Session.js";
import { FIFTEEN_MINUTES, SMTP, TEMPLATES_DIR, THIRTY_DAYS } from "../constants/index.js";
import UsersCollection from "../db/models/User.js";
import { env } from "../utils/env.js";
import { sendEmail } from "../utils/sendMail.js";


const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + THIRTY_DAYS);
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
  const data = await UsersCollection.create({ ...payload, password: encryptedPassword, });
  delete data._doc.password;
  return data._doc;
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

  await SessionCollection.deleteOne({ _id: sessionId });
  const newSession = createSession();

  return await SessionCollection.create({
    userId: oldSession._id,
    ...newSession,
  });
};

export const requestResetToken = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  };
  const resetToken = jwt.sign({
    sub: user._id,
    email,  
    },
    env('JWT_SECRET'),
    { expiresIn: '15m', },
  );

  const resetPasswordTemlatePath = path.join(TEMPLATES_DIR, 'reset-password-email.html');
  const templateSource = (
    await fs.readFile(resetPasswordTemlatePath)).toString();
  
  const template = handlebars.compile(templateSource);
  const html = template({
    mame: user.name,
    link: `${env('APP_DOMAIN')}/reset-password&token=${resetToken}`,
  });
  

  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html,
  });
};