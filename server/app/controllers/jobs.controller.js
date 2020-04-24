const db = require("../models");
const Jobs = db.jobs;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Title can not be empty!!"
    });
    return;
  }

  // Save Job in the database
  Jobs.create(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Job."
      });
    });
};
// Retrieve all Jobs from the database.
exports.findAll = (req, res) => {
  const userId = req.query.userId;
  var condition = (userId !== "0") ? { userId: userId } : null;

  Jobs.findAll({ where: condition })
    .then(data => {
      res.send({ "jobs": data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Jobs."
      });
    });
};
// Find a single Job with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Jobs.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Jobs with id=" + id
      });
    });
};

// Update a Job by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Jobs.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Jobs was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Jobs with id=${id}. Maybe Jobs was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Jobs with id=" + id
      });
    });
};

// Delete a Jobs with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Jobs.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Job was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Job with id=${id}. Maybe Job was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Job with id=" + id
      });
    });
};