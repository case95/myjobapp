const { User } = require('../models') //Sequelize Model for User
const jwt = require('jsonwebtoken')

//AuthControllerPolicy needed to verify if the input on register follow the schema we declared with joi

//require config to pull jwt secret from
const config = require('../config/config')

function jwtLoginUser(user) {
  //the token will last for 2 weeks
  const tokenExpireTime = 60 * 60 * 24 * 14
  //jwt.sign accepts the login credentials as first parameter, the secret algorythm for encryption as second parameter and the expry time as third parameter
  //The jwt.sign() argumets are the payload, the secret key and the expiry time of the token.
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: tokenExpireTime,
  })
}

module.exports = {
  //register user
  async register(req, res) {
    try {
      const user = await User.create({
        ...req.body,
        image: '',
        location: '',
        phone: '',
        website: '',
        availability: 0,
        job: '',
        skills: '1,2,3,4,5',
        bio: `Hello, I'm ${req.body.firstName}`,
      }) // Creates a new user using the user model
      const userJSON = user.toJSON() // Converts the user to JSON
      res.send({
        //we don't want to send back the password
        user: userJSON.email,
        //by sending back the token on register, the user gets automatically logged in
        token: jwtLoginUser(userJSON),
      })
    } catch (err) {
      res.status(400).send({
        error: `Email ${req.body.email} already in use.`,
      })
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email,
        },
      })
      if (!user) {
        return res.status(401).send({
          error: 'The email is incorrect',
        })
      }
      const isPasswordValid = await user.comparePassword(password)
      console.log(`The password is ${isPasswordValid}`)
      if (!isPasswordValid) {
        return res.status(401).send({
          error: 'The password is incorrect',
        })
      }
      //If the login details are correct sends back a token
      const userTest = {
        password: user.password,
        email: user.email,
        id: user.id,
      }
      const userJSON = userTest
      res.send({
        user: userJSON,
        token: jwtLoginUser(userJSON),
      })
    } catch (err) {
      res.status(500).send({
        error: 'A errors has occurred well trying to login',
      })
    }
  },

  authCheck(req, res, next) {
    try {
      const token = req.headers.authorization
      if (!token) {
        res.status(500).send({
          error: 'A errors has occurred while trying to login',
        })
      } else {
        jwt.verify(token, config.authentication.jwtSecret, (err, user) => {
          if (err) {
            res.status(401).send({
              message: 'Token provided is expired or invalid',
            })
          } else {
            req.user = user
            next()
          }
        })
      }
    } catch (error) {
      res.status(401).send({
        message: error.message,
      })
    }
  },
  authCheckAfter(req, res) {
    if (req.user) {
      res.json({
        success: true,
        title: 'Authed user',
        user: req.user,
      })
    } else {
      res.json(400).json({
        success: false,
        error: 'No authed user stored',
      })
    }
  },
}

/*
import axios from 'axios';
const setAuthToken = token => {
  if(token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};
export default setAuthToken;
*/

/*
// File: middleware/auth
// Middleware to verify web tokens
function auth(req, res, next){
  // We sent the user token in the http header in the property 'x-auth-token'
  // To keeps things consistent let get the client app to send the token in the http header using the same property name
  const token = req.header('x-auth-token');
  if(!token){
    //If no token in header property x-auth-token
    return res.status(401).send('Access Denied! No token provided');
  }
  try{
    //Decode the token
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    //store the decoded token in the req for the next bit of middleware to access
    req.user = decoded;
    //Call next() middle ware
    next();
  }
  catch(ex){
    //jwt.verify() throw a exception if the token is not valid
    res.status(400).send('Invalid token.');
  }
}
// Export middleware
module.exports = auth;

*/
