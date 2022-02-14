const express = require('express');

const authRouter = require('./routes/auth.router');
const postRouter = require('./routes/post');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/auth', authRouter);
app.use('/posts', postRouter);

app.get('/', (req, res) => {
  res.send('Hi I am working');
})

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
})
