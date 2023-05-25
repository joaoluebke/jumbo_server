"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
exports.productRoutes = void 0;
var prisma_1 = require("../lib/prisma");
var zod_1 = require("zod");
var fastify_multer_1 = __importDefault(require("fastify-multer"));
var multer_1 = __importDefault(require("../config/multer"));
var authenticate_1 = require("../plugins/authenticate");
var upload = (0, fastify_multer_1["default"])(multer_1["default"]);
function productRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            fastify.get("/products", function () { return __awaiter(_this, void 0, void 0, function () {
                var products;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, prisma_1.prisma.product.findMany()];
                        case 1:
                            products = _a.sent();
                            return [2 /*return*/, { products: products }];
                    }
                });
            }); });
            fastify.get("/products/search/:title", function (request) { return __awaiter(_this, void 0, void 0, function () {
                var getProductParams, title, query, products;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            getProductParams = zod_1.z.object({
                                title: zod_1.z.string()
                            });
                            title = getProductParams.parse(request.params).title;
                            query = "%".concat(title, "%");
                            return [4 /*yield*/, prisma_1.prisma.$queryRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["SELECT * from \"Product\" WHERE \"title\" LIKE ", ""], ["SELECT * from \"Product\" WHERE \"title\" LIKE ", ""])), query)];
                        case 1:
                            products = _a.sent();
                            return [2 /*return*/, { products: products }];
                    }
                });
            }); });
            fastify.get("/products/promotions", function () { return __awaiter(_this, void 0, void 0, function () {
                var promotions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, prisma_1.prisma.product.findMany({
                                where: {
                                    promotion: true
                                }
                            })];
                        case 1:
                            promotions = _a.sent();
                            return [2 /*return*/, { promotions: promotions }];
                    }
                });
            }); });
            fastify.get("/products/:id", function (request) { return __awaiter(_this, void 0, void 0, function () {
                var getProductParams, id, product;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            getProductParams = zod_1.z.object({
                                id: zod_1.z.string()
                            });
                            id = getProductParams.parse(request.params).id;
                            return [4 /*yield*/, prisma_1.prisma.product.findMany({
                                    where: {
                                        id: parseInt(id)
                                    }
                                })];
                        case 1:
                            product = _a.sent();
                            return [2 /*return*/, { product: product }];
                    }
                });
            }); });
            fastify.get("/products/subcategories/:subcategoryId", function (request) { return __awaiter(_this, void 0, void 0, function () {
                var getCategoryParams, subcategoryId, productsBySubCategory;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            getCategoryParams = zod_1.z.object({
                                subcategoryId: zod_1.z.string()
                            });
                            subcategoryId = getCategoryParams.parse(request.params).subcategoryId;
                            return [4 /*yield*/, prisma_1.prisma.product.findMany({
                                    where: {
                                        subCategoryId: parseInt(subcategoryId)
                                    }
                                })];
                        case 1:
                            productsBySubCategory = _a.sent();
                            return [2 /*return*/, { productsBySubCategory: productsBySubCategory }];
                    }
                });
            }); });
            fastify.post("/products", {
                onRequest: [authenticate_1.authenticate]
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var createProduct, product;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            createProduct = zod_1.z.object({
                                title: zod_1.z.string(),
                                description: zod_1.z.string(),
                                promotion: zod_1.z.boolean(),
                                price: zod_1.z.number(),
                                promotionPrice: zod_1.z.number(),
                                urlImg: zod_1.z.string(),
                                subCategoryId: zod_1.z.number()
                            });
                            product = createProduct.parse(request.body);
                            return [4 /*yield*/, prisma_1.prisma.product.create({
                                    data: product
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, reply.status(201).send()];
                    }
                });
            }); });
            fastify["delete"]("/products/:id", {
                onRequest: [authenticate_1.authenticate]
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var getProductId, id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            getProductId = zod_1.z.object({
                                id: zod_1.z.string()
                            });
                            id = getProductId.parse(request.params).id;
                            return [4 /*yield*/, prisma_1.prisma.product.deleteMany({
                                    where: {
                                        id: parseInt(id)
                                    }
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, reply.status(201).send()];
                    }
                });
            }); });
            fastify.put("/products/:id", {
                onRequest: [authenticate_1.authenticate]
            }, function (request, reply) { return __awaiter(_this, void 0, void 0, function () {
                var createProduct, getProductId, id, newProduct, savedProduct;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            createProduct = zod_1.z.object({
                                title: zod_1.z.string(),
                                description: zod_1.z.string(),
                                promotion: zod_1.z.boolean(),
                                price: zod_1.z.number(),
                                promotionPrice: zod_1.z.number(),
                                subCategoryId: zod_1.z.number()
                            });
                            getProductId = zod_1.z.object({
                                id: zod_1.z.string()
                            });
                            id = getProductId.parse(request.params).id;
                            newProduct = createProduct.parse(request.body);
                            return [4 /*yield*/, prisma_1.prisma.product.update({
                                    where: {
                                        id: parseInt(id)
                                    },
                                    data: newProduct
                                })];
                        case 1:
                            savedProduct = _a.sent();
                            return [2 /*return*/, reply.status(201).send(savedProduct)];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.productRoutes = productRoutes;
var templateObject_1;
//# sourceMappingURL=product.js.map