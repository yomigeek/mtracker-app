import jwt from 'jsonwebtoken';

require('dotenv').config();

class token {
  static authToken(userId, userRole) {
    const appToken = jwt.sign(
      {
        userId,
        userRole,
      },
      process.env.SECRET, {
        expiresIn: '48h',
      },
    );
    return appToken;
  }
}
export default token;
