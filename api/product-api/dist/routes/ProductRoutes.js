"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("../controllers/ProductController");
const ProductMiddleware_1 = require("../middlewares/ProductMiddleware"); //
const router = express_1.default.Router();
const productController = new ProductController_1.ProductController();
router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", ProductMiddleware_1.authorizeProductOwner, productController.updateProduct);
router.delete("/:id", ProductMiddleware_1.authorizeProductOwner, productController.deleteProduct);
exports.default = router;
