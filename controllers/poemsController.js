import PoemsModel from '../models/poems.js'
import { request } from 'express'

export const getAllPoems = async (req, res) => {
	try {
		const poems = await PoemsModel.find().populate('user').exec()
		res.json(poems)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'К сожалению не удалось...',
		})
	}
}

export const getOnePoems = async (req, res) => {
	try {
		const poemsId = await req.params.id

		PoemsModel.findByIdAndUpdate(
			{
				_id: poemsId,
			},
			{
				$inc: { viewsCount: 1 },
			},
			{
				returnDocument: 'after',
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					res.status(500).json({
						message: 'К сожалению не удалось...',
					})
				}
				if (!doc) {
					return res.status(404).json({
						message: 'К сожалению не найдено🤪',
					})
				}

				res.json(doc)
			}
		)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'К сожалению не удалось...',
		})
	}
}

export const removePoems = (req, res) => {
	try {
		const poemsId = req.params.id

		PoemsModel.findByIdAndDelete(
			{
				_id: poemsId,
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: 'К сожалению не удалось...🥺',
					})
				}

				if (!doc) {
					return res.status(404).json({
						message: 'К сожалению не найдено😞',
					})
				}

				res.json({
					success: true,
				})
			}
		)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'К сожалению не удалось...',
		})
	}
}

export const createPoems = async (req, res) => {
	try {
		const doc = new PoemsModel({
			title: req.body.title,
			text: req.body.text,
			imageUrl: req.body.imageUrl,
			tags: req.body.tags,
			user: req.userId,
		})

		const post = await doc.save()

		res.json(post)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'К сожалению не удалось...',
		})
	}
}

export const updatePoems = async (req, res) => {
	try {
		const poemsId = req.params.id
		await PoemsModel.updateOne(
			{
				_id: poemsId,
			},
			{
				title: req.body.title,
				text: req.body.text,
				imageUrl: req.body.imageUrl,
				user: req.userId,
				tags: req.body.tags,
			}
		)
		res.json({
			success: true,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'К сожалению не удалось...😭',
		})
	}
}
