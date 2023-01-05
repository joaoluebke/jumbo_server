"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var path_1 = __importDefault(require("path"));
var fastify_multer_1 = __importDefault(require("fastify-multer"));
var tmpFolder = path_1["default"].resolve(__dirname, "..", "..", "tmp");
var typesStorage = {
    local: fastify_multer_1["default"].diskStorage({
        destination: function (req, file, cb) {
            console.log("entrou aqui");
            cb(null, path_1["default"].resolve(__dirname, "..", "..", "tmp"));
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now());
        }
    })
};
exports["default"] = {
    directory: tmpFolder,
    storage: typesStorage["local"]
};
//# sourceMappingURL=multer.js.map