"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fastify_multer_1 = __importDefault(require("fastify-multer"));
var path_1 = __importDefault(require("path"));
var tmpFolder = path_1["default"].resolve(__dirname, "..", "..", "tmp");
var storage = fastify_multer_1["default"].diskStorage({
    destination: tmpFolder,
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    }
});
exports["default"] = {
    directory: tmpFolder,
    storage: storage
};
//# sourceMappingURL=multer.js.map