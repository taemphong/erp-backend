import { Router } from "express";
import * as saleController from "./sale.controller.js";
const router = Router();

router.post("/sale", saleController.createSale);

export default router;

