const jwt = require('jsonwebtoken');
const { connection } = require('../config/MySQL');

exports.addToCart = (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ message: 'Bearer token is required' });
    }

    const accessToken = authHeader.split(' ')[1];

    jwt.verify(accessToken, 'super-secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid access token' });
        }
        const userId = decoded.userId;
        const { product_id, quantity } = req.body;
        const sql = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)';
        connection.query(sql, [userId, product_id, quantity], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to add item to cart' });
            }
            return res.status(201).json({ message: 'Item added to cart successfully' });
        });
    });
};


exports.getCart = (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ message: 'Bearer token is required' });
    }

    const accessToken = authHeader.split(' ')[1];

    jwt.verify(accessToken, 'super-secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid access token' });
        }
        const userId = decoded.userId;
        const sql = 'SELECT * FROM cart';
        connection.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to fetch cart items' });
            }
            return res.status(200).json(result);
        });
    });
};
exports.updateCartItem = (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ message: 'Bearer token is required' });
    }

    const accessToken = authHeader.split(' ')[1];

    jwt.verify(accessToken, 'super-secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid access token' });
        }
        const userId = decoded.userId;
        const itemId = req.params.item_id;
        const { quantity } = req.body;

        console.log('Updating item:', itemId, 'to quantity:', quantity); 

        const sql = 'UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?';
        connection.query(sql, [quantity, itemId, userId], (err, result) => {
            if (err) {
                console.error('Failed to update cart item:', err); 
                return res.status(500).json({ message: 'Failed to update cart item' });
            }
            //console.log('Item updated successfully:', result); 
            return res.status(200).json({ message: 'Cart item updated successfully' });
        });
    });
};

exports.removeFromCart = (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ message: 'Bearer token is required' });
    }

    const accessToken = authHeader.split(' ')[1];

    jwt.verify(accessToken, 'super-secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid access token' });
        }
        const userId = decoded.userId;
        const itemId = req.params.id;

        
        const checkSql = 'SELECT * FROM cart WHERE id = ? AND user_id = ?';
        connection.query(checkSql, [itemId, userId], (checkErr, checkResult) => {
            if (checkErr) {
                return res.status(500).json({ message: 'Failed to check cart for item' });
            }
            // if (checkResult.length === 0) {
            //     // Item not found in cart
            //     console.log('Item not found in cart:', itemId);
            //     return res.status(404).json({ message: 'Item not found in cart' });
            // }

            // Delete the item from the cart
            const deleteSql = 'DELETE FROM cart WHERE id = ? AND user_id = ?';
            connection.query(deleteSql, [itemId, userId], (deleteErr, deleteResult) => {
                if (deleteErr) {
                    return res.status(500).json({ message: 'Failed to remove item from cart' });
                }
                return res.status(200).json({ message: 'Item removed from cart successfully' });
            });
        });
    });
};