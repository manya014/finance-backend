const Joi = require('joi');
const { ROLES } = require('../../utils/constants');

exports.updateRoleSchema = Joi.object({
  role: Joi.string().valid(...Object.values(ROLES)).required(),
});

exports.updateStatusSchema = Joi.object({
  isActive: Joi.boolean().required(),
});