import multer from "multer";
import { TEMP_UPLOAD_DIR } from "../constants/index.js";

const storage = multer.diskStorage({
  destination: TEMP_UPLOAD_DIR,
  filename: (req, file, callback) => {
    const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
    callback(null, `${uniquePreffix}_${file.originalname}`);
  }
});

const upload = multer({ storage });

export default upload;