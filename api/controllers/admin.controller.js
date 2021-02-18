const Admin = require("../models/admin.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const admin = new Admin({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  Admin.create(admin, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Admin.",
      });
    else res.send(data);
  });
};

exports.read = (req, res) => {
  Admin.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Admin.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Admin.getById(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Admin.",
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

  Admin.update(req.params.id, new Admin(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found admin with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Admin with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Admin.deleteById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Admin with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Admin with id " + req.params.id,
        });
      }
    } else res.send({ message: `Admin was deleted successfully!` });
  });
};

exports.login = (req, res) => {
  Admin.userLogin(req.body.username, req.body.password, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with phone ${req.body.username}. or password ${req.body.password}`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving user with phone ${req.body.username}. or password ${req.body.password}`,
        });
      }
    } else {
      const token = jwt.sign(
        {
          userName: data.username,
          email: data.email,
        },
        process.env.JWT_KEY,
        {
          expiresIn: 60,
        }
      );
      res.send({ token });
    }
  });
};
