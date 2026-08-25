const usersHandler = require('./users');
module.exports = (req, res) => {
  usersHandler(req, res);
};
