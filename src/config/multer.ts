import path from "path";
import multer from "fastify-multer";

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

const typesStorage = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      console.log("entrou aqui");
      cb(null, path.resolve(__dirname, "..", "..", "tmp"));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now());
    },
  }),
};

export default {
  directory: tmpFolder,
  storage: typesStorage["local"],
};
