const { User } = require("../models");

module.exports = {
  async getWorkers(req, res) {
    try {
      User.findAll().then((users) => {
        console.log(users);
        res.sendStatus(200);
      });
    } catch {
      (err) => console.log(err);
    }
  },

  async postWorkers(req, res) {
    try {
    } catch {}
  },
};
