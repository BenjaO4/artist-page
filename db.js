const sqlite3 = require("sqlite3").verbose();

// Öppna eller skapa databasen
const db = new sqlite3.Database("users.db");

// Skapa tabellen om den inte redan finns
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);
});

module.exports = db;
