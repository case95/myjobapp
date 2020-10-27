const { Categories } = require("../models");

module.exports = {
  
  async getCategories(req, res) {
    try {
      const categories = await Categories.findAll()
      res.send(categories);
    } catch (err) {
      res.send(err);
    }
  },
};
