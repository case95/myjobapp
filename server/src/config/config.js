module.exports = {
  port: process.env.PORT || 8081,
  db: {
    //process.env.DB_NAME is a environmental variable if that is not set then use 'vueproject'
    database: process.env.DB_NAME || "italianjob",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "root",
    options: {
      //dialect - refers to the type of database you are connecting to
      dialect: process.env.DIALECT || "sqlite",
      host: process.env.HOST || "localhost",
      storage: "./italianjob.sqlite",
    },
  },
  authentication: {
    //Application secret for creating a secure web token
    //the secret is hardcoded for development purposes but will be deleted before deploying the app on the internet.
    jwtSecret: process.env.JWT_SECRET || "secret",
  },
};
