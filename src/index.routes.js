import { Router } from "express";
import product from "./product/product.route.js";
import category from "./category/category.route.js";

const router = Router();

router.use("/product", product);
router.use("/category", category);


export default router;  