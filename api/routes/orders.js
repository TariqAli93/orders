module.exports = (app) => {
  const Order = require("../controllers/orders.controller");
  app.post("/api/orders/create", Order.create);
  app.get("/api/orders/read", Order.read);
  app.put("/api/orders/update/:id", Order.update);
  app.put("/api/orders/updateStatus/:id", Order.updateStatus);
  app.delete("/api/orders/delete/:id", Order.delete);
};
