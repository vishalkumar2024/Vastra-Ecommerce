import { Router } from 'express';
const router = Router();
import {addProducts} from '../Controllers/product.controller.js'


router.post('/addproducts',addProducts);

export default router;