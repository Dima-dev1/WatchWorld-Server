import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./db/database.sqlite')


db.run(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        price REAL,
        image TEXT,
        charactertistics TEXT
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
  if (row && row.count === 0) {
    db.run(
      "INSERT INTO users (email, password, role) VALUES (?, ?, ?)",
      ["admin@watchworld.com", "admin123", "superadmin"],
      () => console.log("Super admin created!")
    );
  }
});

export default db