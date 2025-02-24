import { pool } from '../db.js'

export default class EmpService {
    
    async addemployee(emp){
        let sql = `INSERT INTO employees SET ?`
        const [result] = await pool.query(sql, [emp])
        return result
    }

    async getalleployee(){
        let sql = `SELECT * FROM employees`;
        const [result] = await pool.query(sql)
        return result
    }
}