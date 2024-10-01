import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./constants/index.js";
import { initMongoDB } from "./db/initMongoDB.js";
import { setupServer } from "./server.js";
import createDirIfNotExist from "./utils/createDirIfNotExist.js";

const bootstrap = async () => {
  await initMongoDB();
  setupServer();
  await createDirIfNotExist(TEMP_UPLOAD_DIR);
  await createDirIfNotExist(UPLOAD_DIR);
};

bootstrap();
