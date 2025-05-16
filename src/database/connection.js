const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "..", "..", "data", "database.sqlite");
const schemaPath = path.join(__dirname, "schema.sql");

// check if the database file exists
const dbExists = fs.existsSync(dbPath);

// Make connection (if there is no such file it will make it)
const db = new Database(dbPath);

if (!dbExists) {
  console.log("There is no database file. Creating a new one...");

  try {
    const schema = fs.readFileSync(schemaPath, "utf8");
    db.exec(schema);
    console.log("Database inicialized");
  } catch (err) {
    console.error("Error reading schema file:", err.message);
    console.error("Error stack:", err.stack);
  }
} else {
  console.log("Successfully connected to the database");
}

// Enable foreign key constraints
db.pragma("foreign_keys = ON");
// Set the database to use WAL mode (for performance, explanation in module docs)
db.pragma("journal_mode = WAL");

module.exports = db;
