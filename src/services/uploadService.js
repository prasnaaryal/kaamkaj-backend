import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../utils/s3.js";
import dotenv from "dotenv";
dotenv.config();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    // acl: "public-read",
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

export default upload;
