const path = require('path');

module.exports = (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/success.html'));
};
