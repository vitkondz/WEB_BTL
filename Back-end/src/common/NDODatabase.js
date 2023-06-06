const mysql = require("mysql2/promise");

// Truy van co so du lieu
class NDODatabase {

  // Tao pool lien ket gioi han va dung lai nhieu lan
  constructor() {
    this.pool = mysql.createPool({
      host: "localhost",
      port: 3306,
      user: "root",
      password: 12345678,
      database: "registrytotal",
      connectionLimit: 20, 
      waitForConnections: true,
    });
  }

  // Thuc hien cac truy van lay thong tin
  async get(queries, values) {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction(); // Bat dau giao dich

      let kq = [];
      for (let i = 0; i < queries.length; i++) {
        const [rows, fields] = await connection.execute(queries[i], values[i]);
        kq.push(rows);
      }
      
      await connection.commit(); // Commit giao dich
      return kq;
    } catch (error) {
      await connection.rollback(); // Rollback giao dich neu xay ra loi
      console.log(error);
      throw error;
    } finally {
      connection.release();
    }
  }

  // Thuc hien truy van cap nhat du lieu
  async set(queries, values) {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction(); // Bat dau giao dich

      for (let i = 0; i < queries.length; i++) {
        await connection.execute(queries[i], values[i]);
      }
      
      await connection.commit(); // Commit giao dich
      return true;
    } catch (error) {
      await connection.rollback(); // Rollback giao dich neu co loi
      console.log(error);
      throw error;
    } finally {
      connection.release();
    }
  }
}

const ndoDatabase = new NDODatabase();
module.exports = ndoDatabase;
