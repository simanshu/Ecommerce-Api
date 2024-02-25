const jwt = require('jsonwebtoken');
const { connection } = require('../config/MySQL');

exports.placeOrder = (req, res) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(400).json({ message: 'Bearer token is required' });
  }
  const accessToken = token.split(' ')[1];
  jwt.verify(accessToken, 'super-secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid access token' });
    }
    const userId = decoded.userId;
    const { total_amount, items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ message: 'Items must be an array' });
    }

    const orderSql = 'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)';
    connection.query(orderSql, [userId, total_amount], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to place order' });
      }
      const orderId = result.insertId;
      const orderItemsSql = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?';
      const orderItemsValues = items.map(item => [orderId, item.product_id, item.quantity, item.price]);
      connection.query(orderItemsSql, [orderItemsValues], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to place order items' });
        }
        return res.status(201).json({ message: 'Order placed successfully' });
      });
    });
  });
};


exports.getOrderHistory = (req, res) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(400).json({ message: 'Bearer token is required' });
  }

  const accessToken = token.split(' ')[1];

  jwt.verify(accessToken, 'super-secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid access token' });
    }

    const userId = decoded.userId;

    const sql = 'SELECT * FROM orders';
    connection.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to fetch order history' });
      }
      return res.status(200).json(result);
    });
  });
};
