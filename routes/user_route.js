var express = require('express');
var user_controller = require('../controller/user_controller');
var user_model = require('../schema/user_model');
var router = express.Router();


/* Fetch Users */
router.get('/', async (req, res) => {
  try{
      const users = await user_model.find();
      res.status(200).json({user: users, response_message: "Successful response"});
  }
  catch{
      res.status(452).json({response_message: "Something went wrong"})
  }
});

/* Fetch User by ID */
router.get('/:id', async (req, res) => {
  try{
    const id = req.params.id;
    const user = await user_model.findById(id);
    if (!user) return res.status(200).json({user: null, response_message: "Successful response"});

    res.status(200).json({user: user, response_message: "Successful response"});
  }
  catch{
    res.status(452).json({response_message: "Something went wrong"});
  }
});

/* Login User */
router.post('/login', async (req, res) => {
  try{
    result = user_controller.validate_login_fields(req.body);
    if (result.error) res.status(400).send({response_message: result.error.details[0].message});
    res.status(400).send({access_token: "", response_message: "Successful response"});
  }
  catch{
    res.status(452).json({response_message: "Something went wrong"});
  }
});

/* Signup User */
router.post('/signup', async (req, res) => {
  /* User Field Validation */
  result = user_controller.validate_signup_fields(req.body);
  if (result.error) res.status(400).send({response_message: result.error.details[0].message});

  const user = new user_model({
    name: req.body.name,
    email_address: req.body.email_address,
    password: req.body.password
  })

  await user.save().then(() => {
      res.status(201).json({user: user, response_message: "Successful response"})
  }).catch(() => {
      res.status(452).send({response_message: "Something went wrong"})
  })
});


router.put('/:id',user_controller.update_user_controller)

module.exports = router
