const express = require('express');
const rApi = express.Router();
const jwt = require('jsonwebtoken');

const generateTokens = require('../controllers/Api');
const authenticateToken = require('../middleware/authenticateRequest');

rApi.post('/token', generateTokens);

rApi.get('/protected_route', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Protected route reached', user: req.user });
});


module.exports = rApi