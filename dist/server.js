"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fastify_1 = __importDefault(require("fastify"));
var cors_1 = __importDefault(require("@fastify/cors"));
var jwt_1 = __importDefault(require("@fastify/jwt"));
var fastify_multer_1 = __importDefault(require("fastify-multer"));
var dotenv = __importStar(require("dotenv"));
var auth_1 = require("./routes/auth");
var user_1 = require("./routes/user");
var product_1 = require("./routes/product");
var category_1 = require("./routes/category");
var subCategory_1 = require("./routes/subCategory");
var banner_1 = require("./routes/banner");
var aws_1 = require("./routes/aws");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
dotenv.config();
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var fastify;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fastify = (0, fastify_1["default"])({
                        logger: true,
                        http2: true,
                        https: {
                            key: fs_1["default"].readFileSync(path_1["default"].join(__dirname, "../src", "ssl", "jumbo-decrypted.key")),
                            cert: fs_1["default"].readFileSync(path_1["default"].join(__dirname, "../src", "ssl", "jumbo.co.ao.crt"))
                        }
                    });
                    return [4 /*yield*/, fastify.register(fastify_multer_1["default"].contentParser)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fastify.register(cors_1["default"], { origin: true })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, fastify.register(jwt_1["default"], { secret: process.env.JWT_SECRET })];
                case 3:
                    _a.sent();
                    fastify.register(aws_1.awsRoutes);
                    fastify.register(auth_1.authRoutes);
                    fastify.register(user_1.userRoutes);
                    fastify.register(banner_1.bannerRoutes);
                    fastify.register(product_1.productRoutes);
                    fastify.register(category_1.categoryRoutes);
                    fastify.register(subCategory_1.subCategoryRoutes);
                    return [4 /*yield*/, fastify.listen({ port: 3333, host: "0.0.0.0" })];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
bootstrap();
//# sourceMappingURL=server.js.map