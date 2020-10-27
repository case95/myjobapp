const { User } = require("../models");
const {Op} = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      User.findAll().then((users) => {;
        res.status(200).send(users);
      });
    } catch {
      (err) => console.log(err);
    }
  },
  
  async getUserData(req, res) {
    try {
      const user = await User.findOne({
          where: { id: req.params.userId },
          attributes: {exclude: ['password', 'id', 'createdAt', 'updatedAt']
        }
      })
      res.send(user);
    } catch (err) {
        res.status(500).send(err)
    }
  },
  
  async postWorkers(req, res) {
    try {
    } catch {}
  },
};
