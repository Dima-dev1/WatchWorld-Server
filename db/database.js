import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./db/database.sqlite')

export default db