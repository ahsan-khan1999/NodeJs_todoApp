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

function read_users_controller(filter_data) {
  if (!filter_data) {
    response_codes;
    const users = user_model.find();
    return (
      users,
      response_codes.CODE_RESPONSE_SUCCESS,
      response_codes.MESSAGE_RESPONSE_SUCCESS
    );
  }

  res
    .status(200)
    .json({ user: users, response_message: "Successful response" });
}

/* Update Operations */
const update_user_controller = async(req,res) => {
  try {
    
    result = validate.validate_user_update_field(req.body);
    console.log(result,"at result");
    if(result.error){
      res.status(400).send({response_message:ressult.error.details[0].message})
    } else{

      const id = req.params.id
      // console.log(body,"at body");
      // validate.validate_user_update_field(body);
      const user =await  user_modal.findOneAndUpdate(
        {
          _id:id,
        },
        {name: req.body.name,
          email_address: req.body.email_address,
          password: req.body.password,
          status: req.body.status},
        {
          returnDocument: "after",
        }
      );
      console.log(user,"at user");
      return res
        .status(response_codes.CODE_RESPONSE_SUCCESS)
        .json({
          user: user,
          response_message: response_codes.MESSAGE_RESPONSE_SUCCESS,
        });
    }
    
    

  } catch {
    // return res
    //   .status(response_codes.CODE_RESPONSE_ERROR)
    //   .json({
    //     response_message: response_codes.MESSAGE_RESPONSE_ERROR,
    //   });
  }
};

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

/* Delete Operations */
function remove_user_controller(remove_id) {}

module.exports = {
  read_users_controller: read_users_controller,
  signup_user_controller: signup_user_controller,
  login_user_controller: login_user_controller,
  remove_user_controller: remove_user_controller,
  update_user_controller: update_user_controller,
};
