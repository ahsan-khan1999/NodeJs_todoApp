var common_utils = require("../utils/common_utils");
var user_utils = require("../utils/user_utils");
var user_model = require("../schema/user_model");
var response_codes = require("../utils/response_codes");
var Joi = require("joi");

/* CRUD Operations */

/* Create Operations */
function signup_user_controller(signup_data) {}

/* Read Operations */
function login_user_controller(login_data) {}

read_users_controller = async (filter_data=[]) => {
  if (Object.keys(filter_data).length < 1) {
    const users = await user_model.find();
    return {
      users: users,
      response_code: response_codes.CODE_RESPONSE_SUCCESS,
      response_message: response_codes.MESSAGE_RESPONSE_SUCCESS
    };
  }

  const users = await user_model.findById(filter_data.id);

  return {
    users: users,
    response_code: response_codes.CODE_RESPONSE_SUCCESS,
    response_message: response_codes.MESSAGE_RESPONSE_SUCCESS
  };
};

/* Update Operations */
function update_user_controller(update_data) {}

/* Delete Operations */
function remove_user_controller(remove_id) {}

module.exports = {
  read_users_controller: read_users_controller,
  signup_user_controller: signup_user_controller,
  login_user_controller: login_user_controller,
  remove_user_controller: remove_user_controller,
  update_user_controller: update_user_controller,
};
