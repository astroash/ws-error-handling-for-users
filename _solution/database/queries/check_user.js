const db = require('../db_connection');

module.exports = username => {
  const query = 'SELECT EXISTS(SELECT 1 FROM users WHERE username = $1)';
  return db.query(query, [username]);
};
