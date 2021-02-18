const sql = require("../database/database");
const Admin = function (admin) {
  this.username = admin.username;
  this.password = admin.password;
  this.email = admin.email;
};

Admin.create = (newAdmin, result) => {
  sql.query("INSERT INTO admin SET ?", newAdmin, (err, res) => {
    if (err) {
      console.error(JSON.stringify(err));
      result(err, null);
      return;
    } else {
      console.log("created", res);
      result(null, { id: res.insertId, ...newAdmin });
    }
  });
};

Admin.update = (id, admin, result) => {
  sql.query("UPDATE admin SET ? WHERE id = ?", [admin, id], (err, res) => {
    if (err) {
      console.error(JSON.stringify(err));
      result(err, null);
      return;
    } else {
      console.log("updated", res);
      result(null, { id: res.insertId, ...admin });
    }
  });
};

Admin.getAll = (result) => {
  sql.query("SELECT * FROM admin", (err, res) => {
    if (err) {
      console.error(JSON.stringify(err));
      result(err, null);
      return;
    } else {
      console.log(res);
      result(null, res);
    }
  });
};

Admin.getById = (id, result) => {
  sql.query("SELECT * FROM admin WHERE id = ?", id, (err, res) => {
    if (err) {
      console.error(JSON.stringify(err));
      result(err, null);
      return;
    } else {
      console.log(res[0]);
      result(null, res[0]);
    }
  });
};

Admin.deleteById = (id, result) => {
  sql.query("DELETE FROM admin WHERE id =?", (err, res) => {
    if (err) {
      console.error(JSON.stringify(err));
      result(err, null);
      return;
    } else {
      console.log(res[0]);
      result(null, res[0]);
    }
  });
};

Admin.userLogin = (username, password, result) => {
  sql.query(
    `SELECT * FROM admin WHERE username = "${username}" AND password = "${password}"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found admin: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = Admin;