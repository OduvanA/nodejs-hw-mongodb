import { ONE_DAY } from "../constants/index.js";
import * as authServices from "../services/auth.js";

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const signupController = async (req, res) => {
  const newUser = await authServices.signup(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user',
    data: newUser,
  });
};

export const signinController = async (req, res) => {
  const session = await authServices.signin(req.body);

  setupSession(res, session);
  
  res.json({
    status: 200,
    message: 'Successfully signed in',
    data: {
      accessToken: session.accessToken,
    }, 
  });
};