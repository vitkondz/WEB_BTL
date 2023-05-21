const mysql = require("mysql2/promise");

class NDODatabase {
  constructor() {
    this.pool = mysql.createPool({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "12345678",
      database: "registrytotal",
      connectionLimit: 20, 
      waitForConnections: true,
    });
  }

  async get(queries, values) {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction(); // Bắt đầu giao dịch

      let kq = [];
      for (let i = 0; i < queries.length; i++) {
        const [rows, fields] = await connection.execute(queries[i], values[i]);
        kq.push(rows);
      }
      
      await connection.commit(); // Commit giao dịch
      return kq;
    } catch (error) {
      await connection.rollback(); // Rollback giao dịch
      console.log(error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async set(queries, values) {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction(); // Bắt đầu giao dịch

      for (let i = 0; i < queries.length; i++) {
        await connection.execute(queries[i], values[i]);
      }
      
      await connection.commit(); // Commit giao dịch
      return true;
    } catch (error) {
      await connection.rollback(); // Rollback giao dịch
      console.log(error);
      throw error;
    } finally {
      connection.release();
    }
  }
}

const ndoDatabase = new NDODatabase();
module.exports = ndoDatabase;
