const express = require('express');
const {register, allUsers, login} = require('../controllers/user.controller');
const { verify } = require('../middlewares/verifytoken');

const router = express.Router();

router.post('/register', register);
router.get('/all', verify, allUsers)
router.post('/login', login)

module.exports = router;
