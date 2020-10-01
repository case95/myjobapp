const express = require("express");
const router = express.Router();

const testController = require("../controllers/testController");
const userController = require("../controllers/userController");
const AuthenticationController = require("../controllers/AuthenticationController");

//Routes
router.get("/test", testController.getTest);
router.post("/test", testController.postTest);

router.get("/workers", userController.getWorkers);

router.post("/register", AuthenticationController.register);

module.exports = router;
