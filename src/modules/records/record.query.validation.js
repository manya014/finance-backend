const Joi = require('joi');
const { RECORD_TYPES } = require('../../utils/constants');

exports.getAllQuerySchema = Joi.object({
  type: Joi.string().valid(...Object.values(RECORD_TYPES)),
  category: Joi.string(),
  startDate: Joi.date(),
  endDate: Joi.date().when('startDate', {
    is: Joi.exist(),
    then: Joi.date().min(Joi.ref('startDate')),
  }),
  search: Joi.string(),
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
});