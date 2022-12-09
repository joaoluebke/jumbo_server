import multer from "fastify-multer";
import path from "path";
const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

const storage = multer.diskStorage({
  destination: tmpFolder,
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

export default {
  directory: tmpFolder,
  storage: storage,
};
