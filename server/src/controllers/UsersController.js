const { User } = require('../models')
const { Op } = require('sequelize')

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.findAll({
        where: {
          category: { [Op.like]: `%${req.query.category}%` },
          location: { [Op.like]: `%${req.query.location}%` },
          [Op.or]: [
            { job: { [Op.like]: `%${req.query.job}%` } },
            { bio: { [Op.like]: `%${req.query.job}%` } },
            { skills: { [Op.like]: `%${req.query.job}%` } },
          ],
        },
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      })
      console.log(users)
      users.length === 0
        ? res
            .status(200)
            .send({ error: "Sorry, your search didn'y produce any result." })
        : res.status(200).send(users)
    } catch (err) {
      console.log('ERROR', err)
      res.status(404).send(err)
    }
  },

  async getUserData(req, res) {
    try {
      const user = await User.findOne({
        where: { id: req.params.userId },
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      })
      res.send(user)
    } catch (err) {
      res.status(500).send(err)
    }
  },

  async updateUserData(req, res) {
    try {
      const user = await User.update(req.body, {
        where: { id: req.body.id },
      })
      res.send(user)
    } catch (err) {
      res.status(500).send({
        error: `Sorry ${req.body.firstName}, there was a problem updating your data.`,
      })
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOne({
        where: { id: req.params.userId },
      })
      await user.destroy()
      res.status(200).send('de boa')
    } catch (err) {
      res.status(500).send(err)
    }
  },
}
