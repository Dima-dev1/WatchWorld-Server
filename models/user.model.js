import db from '../db/database.js'
import bcrypt from 'bcrypt'

export const create = async(data) => {
    const { email, password, role = "user" } = data
    const hashedPassword = await bcrypt.hash(password, 10)
    return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
      [email, hashedPassword, role],
      function (err) {
        if (err) return reject(err)
        resolve(this.lastID)
      }
    )
  })
}

export const verifyPassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

export const findByID = (id) => {
    return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM users WHERE id = ?',
      [id],
      (err, row) => {
        if (err) return reject(err)
        resolve(row)
      }
    )
  })
}

export const findByEmail = (email) => {
    return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (err, row) => {
        if (err) return reject(err)
        resolve(row)
      }
    )
  })
}