const mysql = require("mysql2/promise");

class NDODatabase {
  constructor() {
    this.pool = mysql.createPool({
      host: "localhost",
      port: 3306,
      user: "root",
      password: null,
      database: "registrytotal",
      connectionLimit: 20, 
      waitForConnections: true,
    });
  }

  async get(query, values) {
    const connection = await this.pool.getConnection();
    try {
      const [rows, fields] = await connection.execute(query, values);
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async set(query, values) {
    const connection = await this.pool.getConnection();
    try {
      await connection.execute(query, values);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = NDODatabase;
