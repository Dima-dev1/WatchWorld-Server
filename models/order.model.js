import db from "../db/database.js";

export const create = (orderData, items) => {
  const { first_name, email, last_name, address, phone, total } = orderData;

  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO orders (first_name, email, last_name, address, phone, total) VALUES (?, ?, ?, ?, ?,?)",
      [first_name, email, last_name, address, phone, total],
      function (err) {
        if (err) return reject(err);
        const orderId = this.lastID;
        const stmt = db.prepare(
          "INSERT INTO order_items (order_id,product_id,title,price,quantity,image) VALUES (?, ?, ?, ?, ?,?)",
        );
        for (const item of items) {
          stmt.run([
            orderId,
            item.product_id,
            item.title,
            item.price,
            item.quantity,
            item.image,
          ]);
        }
        stmt.finalize((err) => {
          if (err) return reject(err);
          resolve(orderId);
        });
      },
    );
  });
};

export const getAll = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM orders ORDER BY created_at DESC", [], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

export const getById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM orders WHERE id = ?", [id], (err, row) => {
      if (err) return reject(err);
      if (!row) return resolve(null);

      db.all(
        "SELECT * FROM order_items WHERE order_id = ?",
        [id],
        (err, rows) => {
          if (err) return reject(err);
          row.items = rows;
          resolve(row);
        },
      );
    });
  });
};

export const update = (id, status) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE orders SET status=? WHERE id=?",
      [status, id],
      function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      },
    );
  });
};
