import {
	createPoems,
	getAllPoems,
	getOnePoems,
	removePoems,
	updatePoems,
} from './controllers/poemsController.js'
import { getMe, login, register } from './controllers/userController.js'
import checkAuth from './utils/checkAuth.js'
import { registerValidation } from './validations/auth.js'
import { loginValidation } from './validations/login.js'
import { poemsCreateValidation } from './validations/poems.js'
import express from 'express'
import mongoose from 'mongoose'
import multer from 'multer'

const app = express()
app.use(express.json())

// Connect from MongoDB
mongoose
	.connect(
		'mongodb+srv://admin:112233445566@cluster0.tu34rzt.mongodb.net/blog?retryWrites=true&w=majority'
	)
	.then(() => {
		console.log('DB ok')
	})
	.catch((err) => {
		console.log('Error ' + err)
	})

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})
const upload = multer({ storage })
// { ImageUrl }
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	})
})

// { User }
// Register
app.post('/auth/register', registerValidation, register)
// Login
app.post('/auth/login', loginValidation, login)
// Personal Info
app.get('/auth/me', checkAuth, getMe)

// { Poems }
app.post('/poems', checkAuth, poemsCreateValidation, createPoems)
app.get('/poems', getAllPoems)
app.get('/poems/:id', getOnePoems)
app.patch('/poems/:id', checkAuth, updatePoems)
app.delete('/poems/:id', checkAuth, removePoems)

// Watcher
app.listen(4444, (err) => {
	if (err) return console.log(err, ' Error listening')
	console.log('Server OK')
})
