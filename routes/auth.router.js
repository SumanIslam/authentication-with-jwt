const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { users } = require('../db');

const authRouter = express.Router();

authRouter.post('/signup',[ 
  check('email', 'please provide an valid email').isEmail(),
  check('password', 'password must be at least 7 character long').isLength({ min: 7 })
], async (req, res) => {
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

  if(oldUser) {
    return res.status(400).json({
      errors: [
        {
          msg: "Email already exists",
        }
      ]
    })
  }

  let hashedPassword = await bcrypt.hash(password, 10);
  users.push({
    email,
    password: hashedPassword,
  })
  console.log(users);

  res.send('signup router working');
});

authRouter.get('/all', (req, res) => {
  console.log(users);
  res.json(users)
})

module.exports = authRouter;