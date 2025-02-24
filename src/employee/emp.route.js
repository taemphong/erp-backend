import { Router } from "express";
import * as employeeController from './emp.controller.js';

const router = Router();

router.post("/addemployee", employeeController.addemployee)
router.post("/getallemp", employeeController.getalleployee)

export default router;