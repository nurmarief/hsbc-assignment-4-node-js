const knex = require('../knexmodels/knex')
const bcrypt = require('bcrypt')
const {user} = require('../models')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
	const {firstName, lastName, userName, email, password} = req.body

	/* const regis = await knex('users').insert({
		firstName: firstName,
		lastName: lastName,
		userName: userName,
		email: email,
		password: password,
	}) */
	const hashPassword = bcrypt.hashSync(password, 8)
	const regis = await user.create({
		firstName: firstName,
		lastName: lastName,
		userName: userName,
		email: email,
		password: hashPassword,
	})

	return res.status(201).send({
		message: "Create user succes"
	})
}

const allUsers = async (req, res) => {
	const all = await knex.select().from('users')

	return res.status(200).send({
		message: "All user data retrieved",
		data: all
	})
}

const login = async (req, res) => {
	const data = req.userInfo

	const token = jwt.sign({id: data.id, userName: data.userName}, process.env.JWT_SECRET, {expiresIn: 3600})

	return res.status(200).send({
		message: "Login Success",
		data: token
	})
}

const addProfile = async (req, res, next) => {
	const userData = req.user
	const file = req.file

	const updateProfileField = await user.update({picture: file.path}, {where: {id: userData.id}})
	return res.status(201).send({
		message: "upload success"
	})
}
module.exports = {register, allUsers, login, addProfile}

