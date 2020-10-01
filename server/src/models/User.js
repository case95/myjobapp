module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
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
  });

  return User;
};
