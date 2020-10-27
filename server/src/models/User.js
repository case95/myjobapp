const bcrypt = require("bcrypt");

async function hashPassword(user) {
  //checks if the password has been modified.
  if (!user.changed("password")) {
    return;
  }
  try {
    //only hashing is not enough because if somebody has access to the database they can run decryption softwares and feed them all the passwords and trying to discover the jwtSecret: process.env.JWT_SECRET by tempting to decript the hashed password as common passwords, untill the software recognizes the secret password.

    //so we need to ad another level of encryption called salting, it is another password stored in the server.
    //bcrypt.genSalt(10) the 10 is the complexity of the password, 10 is the average.
    const salt = await bcrypt.genSalt(10);
    //this will pull the password out of user parameter and hash it via bcrypt.hash().
    const hashPasswordValue = await bcrypt.hash(user.password, salt);
    //sequelize method to set a data value.
    //the first argument is the field name and the secont argument is the value.
    user.setDataValue("password", hashPasswordValue);
  } catch (err) {
    //temporary error handle.
    console.log(err);
  }
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    //Table name.
    "User",
    //Table fields with the data types.
    {
      email: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING },
      firstName: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING },
      image: { type: DataTypes.STRING },
      location: { type: DataTypes.STRING },
      phone: { type: DataTypes.NUMBER },
      website: { type: DataTypes.STRING },
      availability: { type: DataTypes.INTEGER },
      category: { type: DataTypes.STRING },
      job: { type: DataTypes.STRING },
      skills: { type: DataTypes.STRING },
      bio: { type: DataTypes.TEXT },
    },
    //hooks allow us to run something when a database event occurs (beforeCreate, beforeUpdate, beforeSave..).
    //Hooks are a sequelize feature.
    {
      hooks: {
        beforeSave: hashPassword,
      },
    }
  );
  //Need to better understand this.

  User.prototype.comparePassword = async function (password) {
    try {
      const validPassword = await bcrypt.compare(password, this.password);
      return validPassword;
    } catch (error) {
      console.log("Wrong password");
    }
  };
  return User;
};
