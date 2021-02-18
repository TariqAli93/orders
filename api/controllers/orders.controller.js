const Order = require("../models/orders.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Order.create(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    else res.send(data);
  });
};

exports.read = (req, res) => {
  Order.read((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Order.",
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Order.update(
    req.params.id,
    {
      username: req.body.username,
      phone: req.body.phone,
      address: req.body.address,
      product_name: req.body.product_name,
      product_quantity: req.body.product_quantity,
      status: req.body.status,
    },
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Order with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating Order with id " + req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};

exports.updateStatus = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Order.status(req.params.id, req.body.status, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Status with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Status with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Order.delete(req.params.id, (err, data) => {
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
