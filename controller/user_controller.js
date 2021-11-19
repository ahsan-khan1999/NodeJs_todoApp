var Joi = require('joi');


function validate_login_fields(body){
    const schema = {
      email_address: Joi.string().email().required(),
      password: Joi.string().min(8).max(64).required()
    };
    return Joi.validate(body, schema);
  }


function validate_signup_fields(body){
    const schema = {
        name: Joi.string().min(3).max(32).required(),
        email_address: Joi.string().email().required(),
        password: Joi.string().min(8).max(64).required()
    };
    return Joi.validate(body, schema);
}


module.exports = {
    validate_login_fields: validate_login_fields,
    validate_signup_fields: validate_signup_fields
}
