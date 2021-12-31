const db = require("../models");
const Course = db.courses;

exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Course.find(condition)
    .populate({
      path: "instructor",
    })
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
        message: err.message || "Some error occured while retrieving Courses.",
        data: {},
      });
    });
};

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ success: false, message: "Content can not be empty!" });
    return;
  }

  Course.create(req.body)
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
        message: err.message || "Some error occured while creating the Courses",
        data: {},
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Course.findById(id)
    .populate({
      path: "instructor",
    })
    .then((data) => {
      if (!data)
        res.status(404).send({
          success: false,
          message: "Not found Courses with id " + id,
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
        message: "Error retrieving Courses with id=" + id,
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

  Course.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          success: false,
          message: `Cannot update Courses with id=${id}. Maybe Courses was not found!`,
          data: {},
        });
      } else
        res.send({
          success: true,
          message: "Courses was updated successfuly.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Error updating Courses with id=" + id,
        data: {},
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Course.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          success: false,
          message: `Cannot delete Courses with id=${id}. Maybe Courses was not found!`,
          data: {},
        });
      } else {
        res.send({
          success: true,
          message: "Courses was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Could not delete Courses with id=" + id,
        data: {},
      });
    });
};
