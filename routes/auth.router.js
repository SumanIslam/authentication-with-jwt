const express = require('express');
const { check, validationResult } = require('express-validator');

const authRouter = express.Router();

authRouter.post('/signup',[ 
  check('email', 'please provide an valid email').isEmail(),
  check('password', 'password must be at least 7 character long').isLength({ min: 7 })
], (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  res.send('login router working');
})

module.exports = authRouter;