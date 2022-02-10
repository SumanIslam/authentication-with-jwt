const express = require('express');

const authRouter = require('./routes/auth.router');

const app = express();

app.use(express.json());

// Router
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hi I am working');
})

app.listen(3000, () => {
  console.log('server is running on 3000');
})
