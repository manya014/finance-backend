const Joi = require('joi');

exports.summaryQuerySchema = Joi.object({
  startDate: Joi.date(),
  endDate: Joi.date().when('startDate', {
    is: Joi.exist(),
    then: Joi.date().min(Joi.ref('startDate')),
  }),
});