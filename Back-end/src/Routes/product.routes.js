import { Router } from 'express';
const router = Router();
import { addProducts, removeProduct, getAllProducts } from '../Controllers/product.controller.js'


router.post('/addproducts', addProducts);
router.post('/removeproduct', removeProduct);
router.get('/getallproducts', getAllProducts);

export default router;