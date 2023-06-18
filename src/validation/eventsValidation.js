const Joi = require('joi');


const keys =Joi.object().keys({ 
    email: Joi
    .string()
    .min(30)
    .max(100)
    .required(),

    name: Joi
    .string()
    .min(30)
    .max(100)
    .required(),

    age: Joi
    .string()
    .min(18)
    .max(80)
    .required(),
})

module.exports = keys;