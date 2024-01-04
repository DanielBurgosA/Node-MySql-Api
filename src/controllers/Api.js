const generateToken = require('../helpers/Token');

const generateTokens = (req, res) => {
  try {
    const token = generateToken();
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = generateTokens;