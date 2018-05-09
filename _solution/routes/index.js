const router = require('express').Router();
const homePage = require('./home');
const form = require('./form');
const success = require('./success');

router.get('/', homePage);
router.get('/success', success);
router.post('/api/form', form);

module.exports = router;
