import { pool } from "../db.js";

export default class categoryService {

    async addCategory(category) {
        const sql = `INSERT INTO categories SET ?`;
        const [result] = await pool.query(sql, [category]);
        return result;
    }

    async getCategories() {
        const sql = `SELECT * FROM categories`;
        const [result] = await pool.query(sql);
        return result;
    }

    async deletecategory(CategoryID) {
        const sql = `DELETE FROM categories WHERE CategoryID = ?`;
        const [result] = await pool.query(sql, [CategoryID]);
        return result;
    }

    async editCategory(category) {
        const sql = `UPDATE categories SET ? WHERE CategoryID = ?`;
        const [result] = await pool.query(sql, [category, category.CategoryID]);
        return result;
    }

    async searchCategory(category) {
        const sql = `SELECT * FROM categories WHERE CategoryName LIKE ?`;
        const [result] = await pool.query(sql, [category]);
        return result;
    }
}