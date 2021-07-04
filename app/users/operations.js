const { user, Sequelize } = require("../models");
const User = user;
const { v4 } = require('uuid');
const Op = Sequelize.Op;

// Create and Save a new User
exports.insert = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const user = {
    name: req.body.name,
    email: req.body.email,
    cpf: req.body.cpf,
    status: "Good",
    password: req.body.password,
  };
  // console.log(user);

  // Save User in the database
  try {
    console.log(user);
    await User.create(user);
    res.send(user);
  } catch (error) {
    res.status(500).send({
      message: "Some error occurred while creating the User."
    });
  }

}

// Retrieve all Users from the database.
// export function findAll(req, res) {
//   const title = req.query.title;
//   var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

//   User.findAll({ where: condition })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving users."
//       });
//     });
// }

// // Find a single User with an id
// export function findOne(req, res) {
//   const id = req.params.id;

//   User.findByPk(id)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving User with id=" + id
//       });
//     });
// }

// // Update a User by the id in the request
// export function update(req, res) {
//   const id = req.params.id;

//   User.update(req.body, {
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "User was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating User with id=" + id
//       });
//     });
// }

// // Delete a User with the specified id in the request
// const _delete = (req, res) => {
//   const id = req.params.id;

//   User.destroy({
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "User was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete User with id=${id}. Maybe User was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete User with id=" + id
//       });
//     });
// };
// export { _delete as delete };

// // Delete all Users from the database.
// export function deleteAll(req, res) {
//   User.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Users were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all users."
//       });
//     });
// }

// // find all published User
// export function findAllPublished(req, res) {
//   User.findAll({ where: { published: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving users."
//       });
//     });
// }
