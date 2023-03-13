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
exports.categoryRoutes = void 0;
var prisma_1 = require("../lib/prisma");
var zod_1 = require("zod");
var authenticate_1 = require("../plugins/authenticate");
function categoryRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            fastify.get("/categories", function () { return __awaiter(_this, void 0, void 0, function () {
                var categories;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, prisma_1.prisma.category.findMany()];
                        case 1:
                            categories = _a.sent();
                            return [2 /*return*/, { categories: categories }];
                    }
                });
            }); });
            fastify.get("/categories/:id", function (request) { return __awaiter(_this, void 0, void 0, function () {
                var getCategoryParams, id, category;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            getCategoryParams = zod_1.z.object({
                                id: zod_1.z.string()
                            });
                            id = getCategoryParams.parse(request.params).id;
                            return [4 /*yield*/, prisma_1.prisma.category.findMany({
                                    where: {
                                        id: parseInt(id)
                                    }
                                })];
                        case 1:
                            category = _a.sent();
                            return [2 /*return*/, { category: category }];
                    }
                });
            }); });
            fastify.post("/categories", {
                onRequest: [authenticate_1.authenticate]
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var createCategory, category;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            createCategory = zod_1.z.object({
                                title: zod_1.z.string()
                            });
                            category = createCategory.parse(request.body);
                            return [4 /*yield*/, prisma_1.prisma.category.create({
                                    data: category
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, reply.status(201).send()];
                    }
                });
            }); });
            fastify["delete"]("/categories/:id", {
                onRequest: [authenticate_1.authenticate]
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var getCategoryId, id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            getCategoryId = zod_1.z.object({
                                id: zod_1.z.string()
                            });
                            id = getCategoryId.parse(request.params).id;
                            return [4 /*yield*/, prisma_1.prisma.subCategory.deleteMany({
                                    where: {
                                        categoryId: parseInt(id)
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, prisma_1.prisma.category.deleteMany({
                                    where: {
                                        id: {
                                            "in": parseInt(id)
                                        }
                                    }
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, reply.status(201).send("Deletado com sucesso!")];
                    }
                });
            }); });
            fastify.put("/categories/:id", {
                onRequest: [authenticate_1.authenticate]
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var createCategory, getCategoryId, id, category;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            createCategory = zod_1.z.object({
                                title: zod_1.z.string()
                            });
                            getCategoryId = zod_1.z.object({
                                id: zod_1.z.string()
                            });
                            id = getCategoryId.parse(request.params).id;
                            category = createCategory.parse(request.body);
                            return [4 /*yield*/, prisma_1.prisma.category.update({
                                    where: {
                                        id: parseInt(id)
                                    },
                                    data: category
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, reply.status(201).send()];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.categoryRoutes = categoryRoutes;
//# sourceMappingURL=category.js.map