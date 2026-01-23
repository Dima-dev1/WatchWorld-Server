import db from '../db/database.js'


export const create = (data) => {
  const { title, description, price, image, characteristics } = data

  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO products (title, description, price, image, characteristics ) VALUES (?, ?, ?, ?, ?)',
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

export const update = (id,data) => {
  const { title, description, price, image, characteristics } = data

  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE products SET title=?,description=?, price=?, image=?, characteristics=? WHERE id=?',
      [title, description, price, image, characteristics, id],
      function (err) {
        if (err) return reject(err)
        resolve(this.lastID)
      }
    )
  })
}

export const remove = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      'DELETE FROM products WHERE id = ?',
      [id],
      (err, row) => {
        if (err) return reject(err)
        resolve(row)
      }
    )
  })
}

export const getFiltered = ({search,minPrice,maxPrice,page,limit}) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM products WHERE 1=1"
    let countQuery = "SELECT COUNT(*) as total FROM products WHERE 1=1"
    const params = []
    const countParams = []
    if (search) {
      query += " AND title LIKE ?"
      countQuery += " AND title LIKE ?"
      params.push(`%${search}%`)
      countParams.push(`%${search}%`)
    }
    if (minPrice) {
      query += " AND price >= ?"
      countQuery += " AND price >= ?"
      params.push(minPrice)
      countParams.push(minPrice)
    }
    if (maxPrice) {
      query += " AND price <= ?"
      countQuery += " AND price <= ?"
      params.push(maxPrice)
      countParams.push(maxPrice)
    }
    const offset = (page - 1) * limit
    query += " ORDER BY id DESC LIMIT ? OFFSET ?"
    params.push(limit, offset)
    db.get(countQuery, countParams, (err,countResult) => {
      if (err) {
        return reject(err)
      }
      db.all(query, params, (err,rows) => {
        if (err) {
          return reject(err)
        }
        resolve({
          products: rows,
          total: countResult.total,
          page: page,
          limit: limit,
          totalPages: Math.ceil(countResult.total / limit)
        })
      })
    })
  })
}

