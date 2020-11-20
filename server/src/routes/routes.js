//Modules required for routing.
const express = require('express')
const router = express.Router()

//Controllers
const CategoriesController = require('../controllers/CategoriesController')
const UsersController = require('../controllers/UsersController')
const AuthenticationController = require('../controllers/AuthenticationController')

//Policies
const AuthControllerPolicy = require('../policies/AuthControllerPolicy')

//Routes

router.post(
  '/register',
  AuthControllerPolicy.register,
  AuthenticationController.register
)

router.post('/login', AuthenticationController.login)
router.get(
  '/auth',
  AuthenticationController.authCheck,
  AuthenticationController.authCheckAfter
)

/* Need to save JWT in HTML only cookie*/

router.get('/categories', CategoriesController.getCategories)

router.get('/browse', UsersController.getUsers)

router.get(
  '/yourprofile/:userId',
  AuthenticationController.authCheck,
  UsersController.getUserData
)
router.put(
  '/yourprofile/:userId',
  AuthenticationController.authCheck,
  UsersController.updateUserData
)
router.delete(
  '/yourprofile/:userId',
  AuthenticationController.authCheck,
  UsersController.deleteUser
)

module.exports = router
