const sql = require("../database/database");
module.exports = {
  create: (newOrder, result) => {
    sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
      if (err) {
        console.error(JSON.stringify(err));
        result(err, null);
        return;
      } else {
        console.log("created Order: ", { id: res.insertId, ...newOrder });
        result(null, { id: res.insertId, ...newOrder });
      }
    });
  },

  update: (id, order, result) => {
    sql.query("UPDATE orders SET ? WHERE id = ?", [order, id], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated order: ", { id: id, ...order });
      result(null, { id: id, ...order });
    });
  },

  status: (id, status, result) => {
    sql.query(
      `UPDATE orders SET status = ${status} WHERE id = ${id}`,
      "",
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated status: ", { id: id, ...status });
        result(null, { id: id, ...status });
      }
    );
  },

  read: (result) => {
    sql.query("SELECT * FROM orders", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("orderId: ", res);
      result(null, res);
    });
  },

  delete: (id, result) => {
    sql.query("DELETE FROM orders WHERE id = ?", id, (err, res) => {
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
