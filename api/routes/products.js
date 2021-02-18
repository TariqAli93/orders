module.exports = (app) => {
  const Products = require("../controllers/products.controller");
  app.post("/api/products/create", Products.create);
  app.post("/api/products/addImage", Products.productImages);
  app.put("/api/products/update/:id", Products.update);
  app.get("/api/products/read", Products.read);
  app.delete("/api/products/delete/:id", Products.delete);
  app.put("/api/products/upload/:id", Products.uploadImage);
};
