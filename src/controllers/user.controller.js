const bcrypt = require('bcrypt')
const {user} = require('../models')
const jwt = require('jsonwebtoken')

module.exports.postRegister = async (req, res, next) => {
	try {
		const {firstName, lastName, userName, email, password} = req.body
	
		const hashPassword = bcrypt.hashSync(password, 8)

		await user.create({
			firstName: firstName,
			lastName: lastName,
			userName: userName,
			email: email,
			password: hashPassword,
		})
	
		return res.status(201).send({
			message: `success, user with username ${userName} was created`
		})

	} catch (error) {
		next(error)
	}
}

module.exports.getAll = async (req, res) => {
	try {
		const data = await user.findAll();
	
		return res.status(200).send({
			message: "success",
			data
		})

	} catch (error) {
		next(error)
	}
}

module.exports.postLogin = async (req, res, next) => {
	try {
		const data = req.userInfo
	
		const token = jwt.sign({id: data.id, userName: data.userName}, process.env.JWT_SECRET, {expiresIn: 3600})
	
		return res.status(200).cookie('token', token, {
			httpOnly: true
		}).send({
			message: 'success',
		})

	} catch (error) {
		next(error)	
	}
}

module.exports.addProfile = async (req, res, next) => {
	const userData = req.user
	const file = req.file

	const updateProfileField = await user.update({picture: file.path}, {where: {id: userData.id}})
	return res.status(201).send({
		message: "upload success"
	})
}
