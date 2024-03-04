require('dotenv').config();
const mysql = require('mysql');

// const pool = mysql.createPool({
//   //connectionLimit:6000,
//     connectTimeout  : 60 * 60 * 1000,
//     // acquireTimeout  : 60 * 60 * 1000,
//     // timeout         : 60 * 60 * 1000,
//   host: 'database-1-project-a2-instance-1.cb6ei0gs68ml.us-west-1.rds.amazonaws.com',
//   user: 'admin',
//   password: 'password',
//   database: 'initialDatabase',
//   port: 3306
// });

exports.storeProducts = async (req, res) => {
  console.log('store')
  try {
    const products = req.body.products;
    var connection = mysql.createConnection({
      host: 'database-1.cb6ei0gs68ml.us-west-1.rds.amazonaws.com',
      user: 'admin',
      password: 'password',
      database: 'initialDatabase',
      port: 3306
    });

    connection.connect(function (err) {
      if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
      }

      console.log('Connected to database.');
    });

    connection.end();

    res.status(200).json(products)

  }

  // pool.getConnection((err, connection) => {
  //   if (err) {
  //     console.error('Error getting connection from pool: ', err);
  //     return res.status(500).json({ error: 'Internal server error 1' });
  //   }

  //       const insertQuery = 'INSERT INTO products (name, price, availability) VALUES (?, ?, ?)';
  //       for (const prod of products) {
  //         connection.query(insertQuery, [prod.name, prod.price, prod.availability], (err, results) => {
  //           if (err) {
  //             console.error('Error executing insert query: ', err);
  //             connection.release();
  //             return res.status(500).json({ error: 'Internal server error' });
  //           }
  //         });
  //       }

  //       return res.status(200).json({ message: 'Products inserted successfully' });
  //     });
  catch (error) {
    console.log('error', error)
    console.error('Error inserting products: ', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.listProducts = async (req, res) => {
  console.log('list')

  // Placeholder for fetching products (not implemented)
  return res.status(501).json({ error: 'Not implemented' });
}
