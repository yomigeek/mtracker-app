import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secret = process.env.SECRET;
const expiresIn = '48h';

class Token {
  /**
   * @description Method to generate token
   *
   * @param {Object} user
   *
   * @return {String} Returned token
   */
  static authToken(userInfo) {
    const appToken = jwt.sign(
      userInfo,
      secret, {
        expiresIn,
      },
    );
    return appToken;
  }
}
export default Token;
