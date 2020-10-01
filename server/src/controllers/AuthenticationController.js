const { User } = require("../models"); //Sequelize Model for User

module.exports = {
  //register user
  async register(req, res) {
    try {
      const user = await User.create(req.body); // Creates a new user using the user model
      const userJSON = user.toJSON(); // Converts the user to JSON
      res.send({
        user: userJSON,
      });
    } catch (err) {
      res.status(400).send({
        error: `ERROR: Email already in use.`,
      });
    }
  },
};
