const jwt = require('jsonwebtoken');
const { JWT_SECRET, USER_ID, USER_NAME} = process.env;

const generateToken = () => {
  try {
    const user = {
      id: USER_ID,
      username: USER_NAME,
    };

    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '1h' });
    return token;
  } catch (error) {
    throw new Error('Token generation failed');
  }
};

module.exports = generateToken;