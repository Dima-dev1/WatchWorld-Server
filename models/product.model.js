import db from '../db/database.js'


export const create = (data) => {
  const { title, description, price, image, characteristics } = data

  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO products (title, description, price, image, characteristics) VALUES (?, ?, ?, ?, ?)',
      [title, description, price, image, characteristics],
      function (err) {
        if (err) return reject(err)
        resolve(this.lastID)
      }
    )
  })
}

export const getAll = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
      if (err) return reject(err)
      resolve(rows)
    })
  })
}

export const getById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM products WHERE id = ?',
      [id],
      (err, row) => {
        if (err) return reject(err)
        resolve(row)
      }
    )
  })
}