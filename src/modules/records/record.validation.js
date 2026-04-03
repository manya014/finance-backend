const Joi = require('joi');
const { RECORD_TYPES } = require('../../utils/constants');

exports.createRecordSchema = Joi.object({
  amount: Joi.number().positive().required(),
  type: Joi.string().valid(...Object.values(RECORD_TYPES)).required(),
  category: Joi.string().required(),
  date: Joi.date().required(),
  notes: Joi.string().allow(''),
});

exports.updateRecordSchema = Joi.object({
  amount: Joi.number().positive(),
  type: Joi.string().valid(...Object.values(RECORD_TYPES)),
  category: Joi.string(),
  date: Joi.date(),
  notes: Joi.string().allow(''),
});