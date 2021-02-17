const Joi = require('joi');

export const CatSchema = Joi.object({
	name: Joi.string(),
	age: Joi.number(),
	breed: Joi.string()
});