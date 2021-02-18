const Product = require("../models/products.model");
const uuid = require("uuid").v4;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  let product = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    quantity: req.body.quantity,
  };

  Product.create(product, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.uploadImage = (req, res) => {
  if (req.files) {
    let file = req.files.image;
    let fileext = file.name.split(".")[1];
    let uuidName = uuid(file.name);
    let filename = uuidName + "." + fileext;
    console.log(fileext);
    file.mv("./api/attachments/" + filename, (err) => {
      if (err) {
        console.log(err);
        res.status(401).send("unable to upload file");
      } else {
        Product.uploadImage(req.params.id, filename, (err, data) => {
          if (err) {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Order.",
            });
          } else {
            console.log(req.files);
            res.send(data);
          }
        });
      }
    });
  }
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "content cant be empty",
    });
  }

  Product.update(req.params.id, req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.read = (req, res) => {
  Product.read((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Order.",
      });
    else {
      res.send(data);
    }
  });
};

exports.productImages = (req, res) => {
  if (req.files) {
    let file = req.files.image;
    let fileext = file.name.split(".")[1];
    let uuidName = uuid(file.name);
    let filename = uuidName + "." + fileext;
    console.log(fileext);
    file.mv("./api/attachments/" + filename, (err) => {
      if (err) {
        console.log(err);
        res.status(401).send("unable to upload file");
      } else {
        Product.productImages(info, (err, data) => {
          if (err) {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Order.",
            });
          } else {
            res.send(data);
          }
        });
      }
    });
  }
};

exports.delete = (req, res) => {
  Product.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Order with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Order with id " + req.params.id,
        });
      }
    } else res.send({ message: `Order was deleted successfully!` });
  });
};
