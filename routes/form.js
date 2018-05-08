const checkUser = require('../database/queries/check_user');

module.exports = (req, res, next) => {
  console.log('in route');

  res.redirect(301, '/success');
};
