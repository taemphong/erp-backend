import { Router } from "express";
import * as productController from "./product.controller.js";
const router = Router();

router.post("/addproduct",productController.addproduct); 
router.post("/getproducts",productController.getProducts);
router.post("/deleteproduct",productController.deleteproduct);
router.post("/editproduct",productController.editproduct);
router.post("/searchproduct",productController.serchproduct);
router.post("/addstock",productController.addStock);
router.post("/lowstock",productController.lowstockproducts);
router.post("/nostock",productController.nostockproducts);

export default router;