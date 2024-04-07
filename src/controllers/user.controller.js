const knex = require('../knexmodels/knex')
const bcrypt = require('bcrypt')
const {user} = require('../models')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
	const {firstName, lastName, userName, email, password} = req.body

	if (!userName || !userName || !email || !password) {
		return res.status(400).send({
			message: "Register failed, field must not empty"
		})
	}

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
	const {userName, password} = req.body

	const getUser = await user.findOne({where: {userName: userName}})

	if (!getUser) {
		return res.status(400).send({
			message: 'Error, user not found'
		})
	}

	const comparedPassword = bcrypt.compareSync(password, getUser.dataValues.password)
	if(!comparedPassword) {
		return res.status(400).send({
			message: "Error, incorrect password"
		})
	}

	const token = jwt.sign({id: getUser.dataValues.id, userName: getUser.dataValues.userName}, process.env.JWT_SECRET, {expiresIn: 60})

	return res.status(200).send({
		message: "Login Success",
		data: token
	})
}

module.exports = {register, allUsers, login}

