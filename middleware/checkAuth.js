const JWT = require('jsonwebtoken');

async function checkAuthentication(req, res, next) {
  const token = req.header('x-auth-token');

  if(!token) {
    return res.status(400).json({
      errors: [
        {
          msg: "NO Token Found",
        }
      ]
    })
  }

  try {
    let user = await JWT.verify(token, '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');
    req.user = user.email;
    next();
  } catch(e) {
    return res.status(400).json({
      errors: [
        {
          msg: "Invalid Token",
        }
      ]
    })
  }
}

module.exports = checkAuthentication;