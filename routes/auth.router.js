const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

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
  const oldUser = users.find(user => {
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

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({
    email,
    password: hashedPassword,
  });

  const token = JWT.sign({
    email
  }, "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", {
    expiresIn: 3600000
  })

  res.json({
    token
  });
});

// login route
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => {
    return user.email === email;
  });

  if(!user) {
    return res.status(400).json({
      errors: [
        {
          msg: "Invalid credentials",
        }
      ]
    })
  }

  let isMatch = bcrypt.compare(password, user.password);

  if(!isMatch) {
    return res.status(400).json({
      errors: [
        {
          msg: "Email already exists",
        }
      ]
    })
  };

  const token = JWT.sign({
    email
  }, "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", {
    expiresIn: 3600000
  })

  res.json({
    token
  });
})

authRouter.get('/all', (req, res) => {
  console.log(users);
  res.json(users)
})

module.exports = authRouter;