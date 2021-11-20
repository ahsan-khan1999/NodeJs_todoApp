var user_utils = require('../utils/user_utils')
var response_codes = require('../utils/response_codes')
var Joi = require('joi');

/* CRUD Operations */

/* Create Operations */
function signup_user_controller(singup_data){
  
}

/* Read Operations */
function login_user_controller(login_data){
  
}


function read_users_controller(filter_data){
  if (!filter_data) { 
    const users = user_model.find();
    return users, response_codes.CODE_RESPONSE_SUCCESS, response_codes.MESSAGE_RESPONSE_SUCCESS
  }

  res.status(200).json({user: users, response_message: "Successful response"});
}

/* Update Operations */
function update_user_controller(update_data){
  
}

/* Delete Operations */
function remove_user_controller(remove_id){
  
}


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
  validate_signup_fields: validate_signup_fields,
  read_users_controller: read_users_controller,
  signup_user_controller: signup_user_controller,
  login_user_controller: login_user_controller,
  remove_user_controller: remove_user_controller,
  update_user_controller: update_user_controller
}
