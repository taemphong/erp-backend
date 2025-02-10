import  { Router } from "express";
import * as categoryController from "./category.controller.js";
const router = Router();

router.post("/category", categoryController.addCategory); 
router.post("/getcategory", categoryController.getCategories);
router.post("/categorydelete", categoryController.deleteCategory);
router.post("/categoryedit", categoryController.editCategory);
router.post("/categorysearch", categoryController.searchCategory);

export default router;