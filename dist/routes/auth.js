"use strict";
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
exports.authRoutes = void 0;
var prisma_1 = require("../lib/prisma");
var zod_1 = require("zod");
var bcrypt_1 = __importDefault(require("bcrypt"));
var authenticate_1 = require("../plugins/authenticate");
function authRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            fastify.post("/login", function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var createUser, user, userExists, res, match, token, userRestruturado;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            createUser = zod_1.z.object({
                                email: zod_1.z.string(),
                                password: zod_1.z.string()
                            });
                            user = createUser.parse(request.body);
                            return [4 /*yield*/, prisma_1.prisma.user.findUnique({
                                    where: {
                                        email: user.email
                                    }
                                })];
                        case 1:
                            userExists = _a.sent();
                            res = "";
                            if (!userExists) {
                                return [2 /*return*/, reply.status(500).send({ res: "Email ou senha inválido!" })];
                            }
                            return [4 /*yield*/, bcrypt_1["default"].compare(user.password, userExists.password)];
                        case 2:
                            match = _a.sent();
                            if (!match) {
                                return [2 /*return*/, reply.status(500).send({ res: "Email ou senha inválido!" })];
                            }
                            token = fastify.jwt.sign({ id: userExists.id, options: process.env.JWT_SECRET }, { expiresIn: "8h" });
                            userRestruturado = {
                                name: userExists.name,
                                email: userExists.email,
                                id: userExists.id,
                                ruleId: userExists.ruleId
                            };
                            return [2 /*return*/, { token: token, userRestruturado: userRestruturado }];
                    }
                });
            }); });
            fastify.get("/me", {
                onRequest: [authenticate_1.authenticate]
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var authorization, token, id, userExists, userRestruturado;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            authorization = request.headers.authorization;
                            if (!authorization) {
                                throw new Error("Não autorizado");
                            }
                            token = authorization.split(" ")[1];
                            id = fastify.jwt.verify(token).id;
                            return [4 /*yield*/, prisma_1.prisma.user.findUnique({
                                    where: {
                                        id: id
                                    }
                                })];
                        case 1:
                            userExists = _a.sent();
                            userRestruturado = {
                                name: userExists.name,
                                email: userExists.email,
                                id: userExists.id,
                                ruleId: userExists.ruleId
                            };
                            return [2 /*return*/, { token: token, userRestruturado: userRestruturado }];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.authRoutes = authRoutes;
//# sourceMappingURL=auth.js.map