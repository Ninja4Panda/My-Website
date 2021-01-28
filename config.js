//Config file for environment variables
module.exports = {
  port: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  staticFiles: process.env.staticFiles,
  mainPage: process.env.mainPage,
  gamePage: process.env.gamePage,
  recipePage: process.env.recipePage,
  errorPage: process.env.errorPage
};