//Imports
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require("../config/config");

//Variables
const db = {};

//New Sequelize object and we are passing in our database details
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

//Setup models for sequelize
//This will read through all of the models in the model folder and set them up to be used by sequelize
fs.readdirSync(__dirname) //Reads through current directory and returns an array of the files
  .filter((file) => file !== "index.js") //Filter out any files that are equivalent to index.js
  //Loops over the array of files and imports them to sequelize.
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize); //This import method takes the file path
    db[model.name] = model; //Sets the model name. This save the model in db under a property[model.name] in this case User. eg db.User = model
  });

db.sequelize = sequelize; // This will allow us to access the sequelize object if we use this module
db.Sequelize = Sequelize; // This will allow us to access the Sequelize class if we use this module

//Exports
module.exports = db;
module.exports.Op = Sequelize.Op;
