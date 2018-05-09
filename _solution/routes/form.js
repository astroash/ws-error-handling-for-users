const checkUser = require('../database/queries/check_user');

const isLetters = value => {
  return RegExp('^[a-zA-Z ]*$').test(value)
};

const hasNoSpecialCharacters = value => {
  return RegExp('^[a-zA-Z0-9_]*$').test(value)
};

const isPasswordStrong = value => {
  return value.length === 0 || RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})').test(value)
};

module.exports = (req, res, next) => {
  const { fullName, userName, password } = req.body

  if (!fullName && !userName && !password) {
    return res.status(400).send({ error: true, message: 'Missing details' })
  }
  
  if(!isLetters(fullName) && !hasNoSpecialCharacters(userName) && !isPasswordStrong(password)){
    return res.status(400).send({ error: true, message: 'Invalid data entered' })
  }

  checkUser(userName).then(data => {
    
    if (!data.rows[0].exists) {
      return res.send({ success: true, message: 'User successfully created'})
    } else {
      return res.status(409).send({ error: true, message: 'Username already exists' })
    }
    
  }).catch(err => {
    console.log(err)
    return res.status(500).send({ error: true, message: 'Server error' })
  })
};
