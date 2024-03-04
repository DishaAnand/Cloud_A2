const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'database-1.cb6ei0gs68ml.us-west-1.rds.amazonaws.com',
  user: 'admin',
  password: 'password',
  database: 'initialDatabase',
  port: 3306
});

exports.storeProducts = async (req, res) => {
  console.log('store');

  const products = req.body.products;
  
  if (!products || !Array.isArray(products)) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  try {
    const connection = await new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          console.error('Error getting connection from pool: ', err);
          reject(err);
        } else {
          resolve(connection);
        }
      });
    });

    const insertQuery = 'INSERT INTO products (name, price, availability) VALUES (?, ?, ?)';

    for (const prod of products) {
      await new Promise((resolve, reject) => {
        connection.query(insertQuery, [prod.name, prod.price, prod.availability], (err) => {
          if (err) {
            console.error('Error executing insert query: ', err);
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }

    connection.release();
    console.log('Products inserted successfully');
    return res.status(200).json({ message: 'Products inserted successfully' });
  } catch (error) {
    console.error('Error inserting products: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.listProducts = (req, res) => {
  console.log('list');
  return res.status(501).json({ error: 'Not implemented' });
};
