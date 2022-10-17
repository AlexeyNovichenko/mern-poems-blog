import { body } from 'express-validator'

export const poemsCreateValidation = [
	body('title', 'Введите название стиха').isLength({ min: 3 }).isString(),
	body('text', 'Введите текст стиха').isLength({ min: 10 }).isString(),
	body('tags', 'Неверный формат тэгов (укажите массив)').optional().isString(),
	body('imageUrl', 'Не верная ссылка на изображение').optional().isString(),
]
