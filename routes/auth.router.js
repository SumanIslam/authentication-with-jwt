const express = require('express');

const authRouter = express.Router();

authRouter.post('/signup', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  res.send('login router working');
})

module.exports = authRouter;