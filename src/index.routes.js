import { Router } from "express";
import product from "./product/product.route.js";
import category from "./category/category.route.js";
import emp from "./employee/emp.route.js"

const router = Router();

router.use("/product", product);
router.use("/category", category);
router.use("/emp", emp);

export default router;  