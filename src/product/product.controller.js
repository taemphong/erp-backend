import productService from "./product.service.js";
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js'; 
import utc from 'dayjs/plugin/utc.js'; 
import cron from 'node-cron';


dayjs.extend(utc);
dayjs.extend(timezone);

const thaiTime = dayjs().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
console.log("thaiTime", thaiTime);

export const addproduct = async (req, res) => {

    const product = req.body;

    try {
        const result = await new productService().addproduct(product);
        
        if (result.affectedRows > 0) {
            res.status(201).send({
                status: "success",
                code: 1,
                message: "Product added successfully",
                cause: "",
                result: {
                    productId: result.insertId,
                    affectedRows: result.affectedRows
                }
            });
        } else {
            res.status(400).send({
                status: "error",
                code: 0,
                message: "Failed to add product",
                cause: "No rows were affected",
                result: result
            });
        }
    }catch (error) {
        res.status(500).send({
            status: "error",
            code: 0,
            message: "Failed to add product",
            cause: error.message,
            result: ""
        });
   
}
}

export const getProducts = async (req, res) => {
    try {
        const result = await new productService().getProducts();

        if (result.length) {
            const productsWithTimezone = result.map(product => ({
                ...product,
                CreatedAt: product.CreatedAt 
                    ? dayjs(product.CreatedAt).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss") 
                    : null
            }));

            res.status(200).send({
                status: "success",
                code: 1,
                message: "Products fetched successfully",
                cause: "",
                result: productsWithTimezone
            });
        } else {
            res.status(400).send({
                status: "error",
                code: 0,
                message: "Failed to fetch products",
                cause: "",
                result: result
            });
        }
    } catch (error) {
        res.status(500).send({
            status: "error",
            code: 0,
            message: "Failed to fetch products",
            cause: error.message,
            result: ""
        });
    }
};

export const deleteproduct = async (req, res) => {
    const { ProductID } = req.body;
    try {
        const result = await new productService().deleteproduct(ProductID);
        if(result.affectedRows){
            res.status(200).send({
                status: "success",
                code: 1,
                message: "Product deleted successfully",
                cause: "",
                result: result
            });
        } else {
            res.status(400).send({
                status: "error",
                code: 0,
                message: "Failed to delete product",
                cause: "",
                result: result
            })
        }
    }catch (error) {
        res.status(500).send({
            status: "error",
            code: 0,
            message: "Failed to delete product",
            cause: error.message,
            result: ""
        });
    }
}

export const editproduct = async (req, res) => {
    const product = req.body;
    try {
        const result = await new productService().editproduct(product);
        if(result.affectedRows){
            res.status(200).send({
                status: "success",
                code: 1,
                message: "Product updated successfully",
                cause: "",
                result: result
            });
        } else {
            res.status(400).send({
                status: "error",
                code: 0,
                message: "Failed to update product",
                cause: "",
                result: result
            })
        }
    }catch (error) {
        res.status(500).send({
            status: "error",
            code: 0,
            message: "Failed to update product",
            cause: error.message,
            result: ""
        });
    }
}

export const serchproduct = async (req, res) => {
    const { ProductName } = req.body;
    const { CategoryID } = req.query;
    try {
        const result = await new productService().serchproduct(ProductName, CategoryID);
        if(result.length){
            res.status(200).send({
                status: "success",
                code: 1,
                message: "Products fetched successfully",
                cause: "",
                result: result
            });
        } else {
            res.status(400).send({
                status: "error",
                code: 0,
                message: "Failed to fetch products",
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

export const addStock = async (req, res) => {
    const { ProductID, QuantityInStock } = req.body;
    try {
        const result = await new productService().addStock(ProductID, QuantityInStock);
        if(result.affectedRows){
            res.status(200).send({
                status: "success",
                code: 1,
                message: "Stock added successfully",
                cause: "",
                result: result
            });
        } else {
            res.status(400).send({
                status: "error",
                code: 0,
                message: "Failed to add stock",
                cause: "",
                result: result
            })
        }
    }catch (error) {
        res.status(500).send({
            status: "error",
            code: 0,
            message: "Failed to add stock",
            cause: error.message,
            result: ""
        });
    }
}

export const lowstockproducts = async (req, res) => {
    try {
        const result = await new productService().lowstockproducts();

        if (result.length) {
            res.status(200).send({
                status: "success",
                code: 1,
                message: "Low stock products fetched successfully",
                cause: "",
                result: result
            });
        } else {

            res.status(400).send({
                status: "error",
                code: 0,
                message: "Not found low stock products",
                cause: "",
                result: result
            });
        }
    } catch (error) {
        res.status(500).send({
            status: "error",
            code: 0,
            message: "Failed to fetch low stock products",
            cause: error.message,
            result: ""
        });
    }
}

export const nostockproducts = async (req, res) => {
    try {
        const result = await new productService().nostockproducts();

        if (result.length) {
            res.status(200).send({
                status: "success",
                code: 1,
                message: "Low stock products fetched successfully",
                cause: "",
                result: result
            });
        } else {

            res.status(400).send({
                status: "error",
                code: 0,
                message: "Not found low stock products",
                cause: "",
                result: result
            });
        }
    } catch (error) {
        res.status(500).send({
            status: "error",
            code: 0,
            message: "Failed to fetch low stock products",
            cause: error.message,
            result: ""
        });
    }
}


