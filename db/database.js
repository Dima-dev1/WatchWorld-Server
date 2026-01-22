import sqlite3 from 'sqlite3'
import bcrypt from 'bcrypt'

const db = new sqlite3.Database('./db/database.sqlite')


db.run(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        price REAL,
        image TEXT,
        characteristics TEXT
    )
`)

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT
    )
`)

db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
  if (err) return console.error(err);

  if (row && row.count === 0) {
    const hashedPassword = bcrypt.hashSync("admin123", 10);
    db.run(
      "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
      ["admin@watchworld.com", hashedPassword, "superadmin"],
      (err) => {
        if (err) return console.error(err);
        console.log("Super admin created!");
      }
    );
  }
});


export default db