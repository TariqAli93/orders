const sql = require("../database/database");
module.exports = {
  create: (product = {}, result) => {
    sql.query("INSERT INTO products SET ?", product, (err, res) => {
      if (err) {
        result(err, null);
        throw err;
        return;
      } else {
        result(null, { id: res.insertId, ...product });
        console.log("created product", { id: res.insertId, ...product });
      }
    });
  },

  uploadImage: (id, image, result) => {
    sql.query(
      "UPDATE products SET image = ? WHERE id =?",
      [image, id],
      (err, res) => {
        if (err) {
          result(err, null);
          throw err;
          return;
        } else {
          result(null, { id: res.insertId, ...image });
          console.log("updated id", { id: res.insertId, ...image });
        }
      }
    );
  },

  productImages: (images, result) => {
    sql.query("INSERT INTO product_images SET ?", images, (err, res) => {
      if (err) {
        result(err, null);
        throw err;
        return;
      } else {
        result(null, { id: res.insertId, ...images });
        console.log("updated id", { id: res.insertId, ...images });
      }
    });
  },

  update: (id, product = {}, result) => {
    sql.query(
      "UPDATE products SET ? WHERE id = ?",
      [product, id],
      (err, res) => {
        if (err) {
          result(err, null);
          throw err;
          return;
        } else {
          result(null, { id: res.insertId, ...product });
          console.log("updated id", { id: res.insertId, ...product });
        }
      }
    );
  },

  read: (result) => {
    sql.query("SELECT * FROM products", (err, res) => {
      if (err) {
        result(err, null);
        throw err;
        return;
      } else {
        result(null, res);
        console.log("Products", res);
      }
    });
  },

  delete: (id, result) => {
    sql.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted Order with id: ", id);
      result(null, res);
    });
  },
};
