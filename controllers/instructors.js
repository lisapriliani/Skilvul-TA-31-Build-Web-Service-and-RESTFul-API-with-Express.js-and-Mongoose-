const db = require("../models");
const Instructor = db.instructors;

exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Instructor.find(condition)
    .then((data) => {
      res.send({
        success: true,
        message: "Data found",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occured while retrieving instructors.",
        data: {},
      });
    });
};

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ success: false, message: "Content can not be empty!" });
    return;
  }

  Instructor.create(req.body)
    .then((data) => {
      res.send({
        success: true,
        message: "Data has been Submitted successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Some error occured while creating the Instructors",
        data: {},
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Instructor.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          success: false,
          message: "Not found Instructors with id " + id,
        });
      else
        res.send({
          success: true,
          message: "Data found",
          data: data,
        });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Error retrieving Instructors with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      success: false,
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Instructor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          success: false,
          message: `Cannot update Instructors with id=${id}. Maybe Instructors was not found!`,
          data: {},
        });
      } else
        res.send({
          success: true,
          message: "Instructors was updated successfuly.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Error updating Instructors with id=" + id,
        data: {},
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Instructor.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          success: false,
          message: `Cannot delete Instructors with id=${id}. Maybe Instructors was not found!`,
          data: {},
        });
      } else {
        res.send({
          success: true,
          message: "Instructors was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Could not delete Instructors with id=" + id,
        data: {},
      });
    });
};
