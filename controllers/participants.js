const db = require("../models");
const Participant = db.participants;

exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Participant.find(condition)
    .populate({
      path: "courses",
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
        message: err.message || "Some error occured while retrieving Participant.",
        data: {},
      });
    });
};

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ success: false, message: "Content can not be empty!" });
    return;
  }

  Participant.create(req.body)
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
        message: err.message || "Some error occured while creating the Participant",
        data: {},
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Participant.findById(id)
    .populate({
      path: "courses",
    })
    .then((data) => {
      if (!data)
        res.status(404).send({
          success: false,
          message: "Not found Participant with id " + id,
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
        message: "Error retrieving Participant with id=" + id,
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

  Participant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          success: false,
          message: `Cannot update Participant with id=${id}. Maybe Participant was not found!`,
          data: {},
        });
      } else
        res.send({
          success: true,
          message: "Participant was updated successfuly.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Error updating Participant with id=" + id,
        data: {},
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Participant.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          success: false,
          message: `Cannot delete Participant with id=${id}. Maybe Participant was not found!`,
          data: {},
        });
      } else {
        res.send({
          success: true,
          message: "Participant was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Could not delete Participant with id=" + id,
        data: {},
      });
    });
};
