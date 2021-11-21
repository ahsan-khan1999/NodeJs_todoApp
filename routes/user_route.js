var express = require("express");
var user_controller = require("../controller/user_controller");
var user_model = require("../schema/user_model");
const response_codes = require("../utils/response_codes");
const common_utils = require("../utils/common_utils");
var router = express.Router();

/* Fetch Users */
router.get("/", async (req, res, next) => {
  try {
    const { users, response_code, response_message } = await user_controller.read_users_controller();
    if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
      return res.status(response_code).json(common_utils.response_generator(
            response_code,
            response_message
          )
        );
    }

    res.status(response_code).json(common_utils.response_generator(
          response_code,
          response_message,
          response_data = { user: users }
        )
      );
  } catch (err) {
    res.status(response_codes.CODE_INTERNAL_SERVER_ERROR).json({ response_message: response_codes.MESSAGE_RESPONSE_INTERNAL_SERVER_ERROR });
    next(err);
  }
});

/* Fetch User by ID */
router.get("/:id", async (req, res, next) => {
  try {
    const { users, response_code, response_message } = await user_controller.read_users_controller(req.params);
    if (response_code != response_codes.CODE_RESPONSE_SUCCESS) {
      return res.status(response_code).json(common_utils.response_generator(
            response_code,
            response_message
          )
        );
    }

    res.status(response_code).json(common_utils.response_generator(
          response_code,
          response_message,
          response_data = { user: users }
        )
      );
  } catch (err) {
    res.status(response_codes.CODE_INTERNAL_SERVER_ERROR).json({ response_message: response_codes.MESSAGE_RESPONSE_INTERNAL_SERVER_ERROR });
    next(err);
  }
});

/* Login User */
router.post("/login", async (req, res) => {
  try {
    result = user_controller.validate_login_fields(req.body);
    if (result.error)
      res
        .status(400)
        .send({ response_message: result.error.details[0].message });
    res
      .status(400)
      .send({ access_token: "", response_message: "Successful response" });
  } catch {
    res.status(452).json({ response_message: "Something went wrong" });
  }
});

/* Signup User */
router.post("/signup", async (req, res) => {
  /* User Field Validation */
  result = user_controller.validate_signup_fields(req.body);
  if (result.error)
    res.status(400).send({ response_message: result.error.details[0].message });

  const user = new user_model({
    name: req.body.name,
    email_address: req.body.email_address,
    password: req.body.password,
  });

  await user
    .save()
    .then(() => {
      res
        .status(201)
        .json({ user: user, response_message: "Successful response" });
    })
    .catch(() => {
      res.status(452).send({ response_message: "Something went wrong" });
    });
});

module.exports = router;
