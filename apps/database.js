const mysql = require("mysql2/promise");
const logger = require("../utils/logger");

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

class Database {
  constructor(config) {
    try {
      this.pool = mysql.createPool(config);
      this.pool
        .query("SELECT 1")
        .then(() => logger.info("MySQL 서버와 연결되었습니다."));
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async get() {
    return this.pool;
  }
}

module.exports = new Database(config);
