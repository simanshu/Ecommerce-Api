const {connection} = require('../config/MySQL');
exports.createCategory = (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    const sql = 'INSERT INTO categories (name) VALUES (?)';
    connection.query(sql, [name], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to create category' });
      }
      return res.status(201).json({ message: 'Category created successfully' });
    });
  };
  

  exports.createProduct = (req, res) => {
    const { title, price, description, availability, category_id } = req.body;
    if (!title || !price || !description || !availability || !category_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const sql = 'INSERT INTO products (title, price, description, availability, category_id) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [title, price, description, availability, category_id], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to create product' });
      }
      return res.status(201).json({ message: 'Product created successfully' });
    });
  };
  
exports.getCategories = (req, res) => {
  const sql = 'SELECT * FROM categories';
  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch categories' });
    }
    return res.status(200).json(result);
  });
};

exports.getProductsByCategory = (req, res) => {
  const categoryId = req.params.category_id;
  const sql = 'SELECT * FROM products WHERE category_id = ?';
  connection.query(sql, [categoryId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch products' });
    }
    return res.status(200).json(result);
  });
};

exports.getProductDetails = (req, res) => {
  const productId = req.params.product_id;
  const sql = 'SELECT * FROM products WHERE id = ?';
  connection.query(sql, [productId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch product details' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(result[0]);
  });
};
