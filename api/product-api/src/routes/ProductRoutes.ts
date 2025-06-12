import express, { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { authorizeProductOwner } from '../middlewares/ProductMiddleware';

const router: Router = express.Router();
const productController = new ProductController();

router.post('/', productController.createProduct);

router.get('/user/:userId', productController.getProductsByUser);

router.get('/user/product/:userId', productController.getProductTypeByUser);
router.get('/user/service/:userId', productController.getServiceTypeByUser);

router.get('/', productController.getAllProducts);

router.put('/:id', authorizeProductOwner, productController.updateProduct);

router.delete('/:id',authorizeProductOwner, productController.deleteProduct);

export default router;
