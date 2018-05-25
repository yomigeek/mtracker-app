import jwt from 'jsonwebtoken';

require('dotenv').config();

// This function verifies the token via the response header or body token
export default function auth(req, res, next) {
  const token = req.body.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).send(error);
      }
      req.decoded = decoded;
      return next();
    });
  } else {
    return res.status(401).send({
      message: 'Unauthorized Acces! You are not allowed to access this page.',
    });
  }
}
