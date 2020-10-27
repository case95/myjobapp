module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    //Table name.
    "Categories",
    //Table fields with the data types.
    {
      category: { type: DataTypes.STRING, unique: true },
    }
  );

  return Categories;
};
