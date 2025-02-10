import categoryService from "./category.service.js";

export const addCategory = async (req, res) => {   
    const category = req.body;
    try {
        const result = await new categoryService().addCategory(category);
        if(result.affectedRows > 0){
            res.status(201).send({
                status: "success",
                code: 1,
                message: "Category added successfully",
                cause: "",
                result: result
            });
        } else {
            res.status(400).send({
                status: "error",
                code: 0,
                message: "Failed to add category",
                cause: "",
                result: result
            })
        } 
    }catch (error) {
        res.status(500).send({
            status: "error",
            code: 0,
            message: "Failed to add category",
            cause: error.message,
            result: ""
        });
    }
 }

 export const getCategories = async (req, res) => {
    try {
        const result = await new categoryService().getCategories();
        if(result.length){
            res.status(200).send({
                status: "success",
                code: 1,
                message: "Categories fetched successfully",
                cause: "",
                result: result
            });
        } else {
            res.status(400).send({
                status: "error",
                code: 0,
                message: "Failed to fetch categories",
                cause: "",
                result: result
            })
        }
 } catch (error) {
    res.status(500).send({
        status: "error",
        code: 0,
        message: "Failed to fetch categories",
        cause: error.message,
        result: ""
    });
 }
}

export const deleteCategory = async (req, res) => {
    const { CategoryID } = req.body;
    try {
        const result = await new categoryService().deletecategory(CategoryID);
        if(result.affectedRows){
            res.status(200).send({
                status: "success",
                code: 1,
                message: "Category deleted successfully",
                cause: "",
                result: result
            });
        } else {
            res.status(400).send({
                status: "error",
                code: 0,
                message: "Failed to delete category",
                cause: "",
                result: result
            })
        }
    } catch (error) {
        res.status(500).send({
            status: "error",
            code: 0,
            message: "Failed to delete category server",
            cause: error.message,
            result: ""
        });
    }
}
 
export const editCategory = async (req, res) => {
    const category = req.body;
    try {
        const result = await new categoryService().editCategory(category);
        if(result.affectedRows){
            res.status(200).send({
                status: "success",
                code: 1,
                message: "Category updated successfully",
                cause: "",
                result: result
            });
        } else {
            res.status(400).send({
                status: "error",
                code: 0,
                message: "Failed to update category",
                cause: "",
                result: result
            })
        }
    } catch (error) {
        res.status(500).send({
            status: "error",
            code: 0,
            message: "Failed to update category",
            cause: error.message,
            result: ""
        });
    }
}

export const searchCategory = async (req, res) => {
    const category = req.body.CategoryName;
    try {
        const result = await new categoryService().searchCategory(category);
        if(result.length){
            res.status(200).send({
                status: "success",
                code: 1,
                message: "Categories fetched successfully",
                cause: "",
                result: result
            });
        } else {
            res.status(400).send({
                status: "error",
                code: 0,
                message: "Failed to fetch categories",
                cause: "",
                result: result
            })
        }
    } catch (error) {
        res.status(500).send({
            status: "error",
            code: 0,
            message: "Internal server error",
            cause: error.message,
            result: ""
        });
    }
}

