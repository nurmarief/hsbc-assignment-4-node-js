const express = require('express');
const userController = require('../controllers/user.controller');
const { verify } = require('../middlewares/verifytoken');
const { regisValidator, loginValidator } = require('../middlewares/validator');
const {upload} = require('../middlewares/upload');


const router = express.Router();

router.get('/', verify, userController.getAll)
router.post('/register', regisValidator, userController.postRegister);
router.post('/login', loginValidator, userController.postLogin)
router.post('/uploadprofile', verify, upload.single('file'), userController.addProfile)

module.exports = router;
