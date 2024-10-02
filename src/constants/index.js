import * as path from "node:path";

export const SORT_ORDER = ['asc', 'desc'];

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAYS = 24 * 60 * 60 * 1000 * 30;

export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const phoneRegexp = /^[\+]?[0-9]{5,12}$/;

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const TEMPLATES_DIR = path.resolve('src', 'templates');

export const TEMP_UPLOAD_DIR = path.resolve('temp');
export const UPLOAD_DIR = path.resolve('uploads');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};

export const SWAGGER_PATH = path.resolve('docs', 'swagger.json');