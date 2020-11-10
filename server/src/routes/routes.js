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
/*router.get('/browse/:userId', UsersController.getUsersById)*/

router.get('/yourprofile/:userId', UsersController.getUserData)
router.put('/yourprofile/:userId', UsersController.updateUserData)

module.exports = router
