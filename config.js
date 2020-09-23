//Config file for environment variables
module.exports = {
  port: process.env.PORT,
  staticFiles: process.env.staticFiles,
  mainPage: process.env.mainPage,
  gamePage: process.env.gamePage,
  errorPage: process.env.errorPage
};