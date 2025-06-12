import express, { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { authorizeProductOwner } from '../middlewares/ProductMiddleware';

const router: Router = express.Router();
const productController = new ProductController();
router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/user/:userId', productController.getProductsByUserAndType);
router.put('/:id', authorizeProductOwner, productController.updateProduct);
router.delete('/:id', authorizeProductOwner, productController.deleteProduct);

export default router;
