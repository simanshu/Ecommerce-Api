const jwt = require('jsonwebtoken');
const {connection} = require('../config/MySQL');

exports.register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
  connection.query(sql, [username, password], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to register user' });
    }
    const accessToken = jwt.sign({ username }, 'super-secret');
    return res.status(201).json({ message:"User Register successfully" ,access_token: accessToken});
  });
};
exports.login = (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(400).json({ message: 'Bearer token is required' });
    }
  
    const accessToken = authHeader.split(' ')[1];
    
    jwt.verify(accessToken, 'super-secret', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid access token' });
      }
      const { username } = decoded;
      const newAccessToken = jwt.sign({ username }, 'super-secret');
      return res.status(200).json({ message: "User login successful", access_token: newAccessToken });
    });
  };
  