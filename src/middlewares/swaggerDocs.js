import swaggerUI from 'swagger-ui-express';
import * as fs from 'node:fs';
import { SWAGGER_PATH } from '../constants/index.js';
import createHttpError from 'http-errors';

const swaggerDocs = () => {
  try {
    const swaggerDocs = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDocs)];
    
  } catch {
    return (req, res, next) => next(createHttpError(500, 'Can not load swagger docs'));
  }
};

export default swaggerDocs;