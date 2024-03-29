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
exports.__esModule = true;
exports.userRoutes = void 0;
var prisma_1 = require("../lib/prisma");
var zod_1 = require("zod");
var bcrypt_1 = require("bcrypt");
var authenticate_1 = require("../plugins/authenticate");
function userRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            fastify.get("/users", {
                onRequest: [authenticate_1.authenticate]
            }, function () { return __awaiter(_this, void 0, void 0, function () {
                var users;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, prisma_1.prisma.user.findMany()];
                        case 1:
                            users = _a.sent();
                            return [2 /*return*/, { users: users }];
                    }
                });
            }); });
            fastify.get("/users/:id", {
                onRequest: [authenticate_1.authenticate]
            }, function (request) { return __awaiter(_this, void 0, void 0, function () {
                var getUserParams, id, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            getUserParams = zod_1.z.object({
                                id: zod_1.z.string()
                            });
                            id = getUserParams.parse(request.params).id;
                            return [4 /*yield*/, prisma_1.prisma.user.findMany({
                                    where: {
                                        id: parseInt(id)
                                    }
                                })];
                        case 1:
                            user = _a.sent();
                            return [2 /*return*/, { user: user }];
                    }
                });
            }); });
            fastify.post("/user", function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var createUser, user, userExists, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            createUser = zod_1.z.object({
                                name: zod_1.z.string(),
                                email: zod_1.z.string(),
                                password: zod_1.z.string(),
                                ruleId: zod_1.z.number()
                            });
                            user = createUser.parse(request.body);
                            return [4 /*yield*/, prisma_1.prisma.user.findUnique({
                                    where: {
                                        email: user.email
                                    }
                                })];
                        case 1:
                            userExists = _b.sent();
                            if (userExists) {
                                throw new Error("Email já cadastrado!");
                            }
                            _a = user;
                            return [4 /*yield*/, (0, bcrypt_1.hash)(user.password, 8)];
                        case 2:
                            _a.password = _b.sent();
                            return [4 /*yield*/, prisma_1.prisma.user.create({
                                    data: user
                                })];
                        case 3:
                            _b.sent();
                            return [2 /*return*/, { user: user }];
                    }
                });
            }); });
            fastify["delete"]("/user/:id", {
                onRequest: [authenticate_1.authenticate]
            }, function (request) { return __awaiter(_this, void 0, void 0, function () {
                var getUserId, id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            getUserId = zod_1.z.object({
                                id: zod_1.z.string()
                            });
                            id = getUserId.parse(request.params).id;
                            return [4 /*yield*/, prisma_1.prisma.user.deleteMany({
                                    where: {
                                        id: parseInt(id)
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, "usuário deletado"];
                    }
                });
            }); });
            fastify.put("/user/:id", {
                onRequest: [authenticate_1.authenticate]
            }, function (request) { return __awaiter(_this, void 0, void 0, function () {
                var createUser, getUserId, id, user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            createUser = zod_1.z.object({
                                name: zod_1.z.string(),
                                email: zod_1.z.string(),
                                password: zod_1.z.string(),
                                ruleId: zod_1.z.number()
                            });
                            getUserId = zod_1.z.object({
                                id: zod_1.z.string()
                            });
                            id = getUserId.parse(request.params).id;
                            user = createUser.parse(request.body);
                            return [4 /*yield*/, prisma_1.prisma.user.update({
                                    where: {
                                        id: parseInt(id)
                                    },
                                    data: user
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, console.log("usuário atualizado")];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.userRoutes = userRoutes;
//# sourceMappingURL=user.js.map