const express = require('express');
const {register, allUsers, login, addProfile, } = require('../controllers/user.controller');
const { verify } = require('../middlewares/verifytoken');
const { regisValidator, loginValidator } = require('../middlewares/validator');
const {upload} = require('../middlewares/upload');


const router = express.Router();

router.post('/register', regisValidator, register);
router.get('/all', verify, allUsers)
router.post('/login', loginValidator, login)
router.post('/uploadprofile', verify, upload.single('file'), addProfile)

module.exports = router;
