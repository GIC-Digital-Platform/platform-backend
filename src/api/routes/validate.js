const Joi = require('joi');
const { ValidationError } = require('../middleware/errors');

const cafeSchema = Joi.object({
  name: Joi.string().min(6).max(10).required().messages({
    'string.min': 'Name must be at least 6 characters',
    'string.max': 'Name must be at most 10 characters',
    'any.required': 'Name is required',
  }),
  description: Joi.string().max(256).required().messages({
    'string.max': 'Description must be at most 256 characters',
    'any.required': 'Description is required',
  }),
  location: Joi.string().required().messages({
    'any.required': 'Location is required',
  }),
  logo: Joi.string().optional().allow(null, ''),
});

const cafeUpdateSchema = cafeSchema.fork(['name', 'description', 'location'], (f) => f.optional());

const employeeSchema = Joi.object({
  name: Joi.string().min(6).max(10).required().messages({
    'string.min': 'Name must be at least 6 characters',
    'string.max': 'Name must be at most 10 characters',
    'any.required': 'Name is required',
  }),
  email_address: Joi.string().email().required().messages({
    'string.email': 'Invalid email address format',
    'any.required': 'Email address is required',
  }),
  phone_number: Joi.string()
    .pattern(/^[89]\d{7}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must start with 8 or 9 and have exactly 8 digits',
      'any.required': 'Phone number is required',
    }),
  gender: Joi.string().valid('Male', 'Female').required().messages({
    'any.only': 'Gender must be Male or Female',
    'any.required': 'Gender is required',
  }),
  cafe_id: Joi.string().uuid().optional().allow(null, ''),
  start_date: Joi.date().iso().optional().allow(null, ''),
});

const employeeUpdateSchema = employeeSchema.fork(
  ['name', 'email_address', 'phone_number', 'gender'],
  (f) => f.optional(),
);

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: false });
    if (error) {
      return next(new ValidationError(error.details.map((d) => d.message).join('; ')));
    }
    next();
  };
}

module.exports = {
  validateCreateCafe: validateBody(cafeSchema),
  validateUpdateCafe: validateBody(cafeUpdateSchema),
  validateCreateEmployee: validateBody(employeeSchema),
  validateUpdateEmployee: validateBody(employeeUpdateSchema),
};
