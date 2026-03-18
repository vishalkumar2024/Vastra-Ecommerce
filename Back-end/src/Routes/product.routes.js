import { Router } from 'express';
const router = Router();
import { addProducts, removeProduct, getAllProducts,addCart, removeCart, getCart } from '../Controllers/product.controller.js'
import { isAuth } from '../Middleware/isAuth.middleware.js';


router.post('/addproducts', addProducts);
router.post('/removeproduct', removeProduct);
router.get('/getallproducts', getAllProducts);
router.post('/addcart',isAuth, addCart);
router.post('/removecart',isAuth, removeCart);
router.post('/getcart',isAuth, getCart);

export default router;