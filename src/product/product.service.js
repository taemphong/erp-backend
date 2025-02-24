import { pool } from '../db.js';

export default class productService{

    async addproduct(product){

        const sql = `INSERT INTO products SET ?`;
        const [result] = await pool.query(sql, [product]);
        return result;

    }

    async addStock(ProductID, QuantityToAdd) {
        const sql = `
            INSERT INTO products (ProductID, QuantityInStock) 
            VALUES (?, ?) 
            ON DUPLICATE KEY UPDATE 
            QuantityInStock = QuantityInStock + ?
        `;
        // ส่งค่าของ QuantityToAdd สองครั้ง (ครั้งแรกสำหรับ VALUES, ครั้งที่สองสำหรับ UPDATE)
        const [result] = await pool.query(sql, [ProductID, QuantityToAdd, QuantityToAdd]);
        return result;
    }
    
    async getProducts(){

        const sql = `SELECT  p.ProductID, p.ProductName, p.QuantityInStock, p.ReorderPoint, p.Price, p.CreatedAt, c.CategoryName 
        FROM Products p
        LEFT JOIN Categories c ON p.CategoryID = c.CategoryID`;
        const [result] = await pool.query(sql);
        return result;

    }

    async deleteproduct(ProductID){

        const sql = `DELETE FROM products WHERE ProductID = ?`;
        const [result] = await pool.query(sql, [ProductID]);
        return result;

    }

    async editproduct(product){

        const sql = `UPDATE products SET ? WHERE ProductID = ?`;
        const [result] = await pool.query(sql, [product, product.ProductID]);
        return result;

    }

    async serchproduct(ProductName, categoryId) {
        const sql = `
            SELECT p.ProductID, p.ProductName, c.CategoryName, p.QuantityInStock, p.Price
            FROM Products p
            JOIN Categories c ON p.CategoryID = c.CategoryID
            WHERE p.ProductName LIKE ? ${categoryId ? 'AND p.CategoryID = ?' : ''}`;
        
        const params = categoryId ? [`%${ProductName}%`, categoryId] : [`%${ProductName}%`];
        const [result] = await pool.query(sql, params);
        return result;
    }

    async lowstockproducts(){
        const sql = `SELECT * FROM products WHERE QuantityInStock < ReorderPoint`;
        const [result] = await pool.query(sql,);
        return result;
    }

    async nostockproducts(){
        const sql = `SELECT * FROM products WHERE QuantityInStock = 0`;
        const [result] = await pool.query(sql,);
        return result;
    }
}