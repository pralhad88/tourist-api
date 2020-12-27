
const User = require('../models/user');
const user = new User();

class UserService {
  constructor() {

  }

  async getAllUsers(req, res) {
    User.get(function (err, user) {
      if (err)
        res.json({
          status: "error",
          message: err
        });
      res.json({
        status: "success",
        message: "All user details!",
        data: user
      });
    });
  }

  async createNewUser(req, res) {
    const { name,
      email,
      contact,
      address,
      state,
      dist
    } = req.body;
    user.name = name;
    user.email = email;
    user.contact = contact;
    user.address = address;
    user.state = state;
    user.dist = dist;

    user.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "New user created!",
        data: user
      });
    });
  }

  async getUserById(req, res) {
    const { id } = req.params;

    User.findById(id, function (err, user) {
      if (err)
        res.send(err);
      res.json({
        message: 'User Details',
        data: user
      });
    });
  }

  async upsertUserById(req, res) {
    const {
      name,
      email,
      contact,
      address,
      state,
      dist
    } = req.body;
    User.findById(req.params.id, function (err, user) {
      if (err) res.send(err);
      user.name = name ? name : user.name;
      user.email = email ? email : user.email;
      user.contact = contact ? contact : user.contact;
      user.address = address ? address : user.address;
      user.state = state ? state : user.state;
      user.dist = dist ? dist : user.dist;
      //save and check errors
      user.save(function (err) {
        if (err)
          res.json(err)
        res.json({
          message: "User Updated Successfully",
          data: user
        });
      });
    });
  }

  async deleteUserById(req, res) {
    User.deleteOne({
      _id: req.params.id
    }, function (err, contact) {
      if (err)
        res.send(err)
      res.json({
        status: "success",
        message: 'User Deleted'
      })
    })
  }
}

module.exports = UserService
