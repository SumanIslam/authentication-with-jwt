const express = require('express');

const authRouter = require('./routes/auth.router');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Router
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hi I am working');
})

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
})
