module.exports = (app) => {
  const Admin = require("../controllers/admin.controller");
  const authCheck = require("../middleware/checkAuth.middleware.js");

  app.post("/api/admin/create", authCheck, Admin.create);
  app.get("/api/admin/read", authCheck, Admin.read);
  app.get("/api/admin/read/:id", authCheck, Admin.findOne);
  app.put("/api/admin/update/:id", authCheck, Admin.update);
  app.delete("/api/admin/delete/:id", authCheck, Admin.delete);
  app.post('/api/admin/login', Admin.login);
};
