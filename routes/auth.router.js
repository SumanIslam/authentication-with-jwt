const express = require('express');
const { check, validationResult } = require('express-validator');
const { users } = require('../db');

const authRouter = express.Router();

authRouter.post('/signup',[ 
  check('email', 'please provide an valid email').isEmail(),
  check('password', 'password must be at least 7 character long').isLength({ min: 7 })
], (req, res) => {
  const { email, password } = req.body;

  // validated the input
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  // validated if user is valid or not
  let oldUser = users.find(user => {
    return user.email === email;
  });

  console.log(oldUser);

  if(oldUser) {
    return res.status(400).json({
      errors: [
        {
          msg: "Email already exists",
        }
      ]
    })
  }


  res.send('signup router working');
})

module.exports = authRouter;