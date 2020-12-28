const mysql = require('mysql')

module.exports.createReports = async function () {
  const pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_DB_NAME,
  })

  const getDatabaseResults = (pool) => {
    return new Promise((resolve) => {
      pool.query('SELECT username FROM auth_user', function (
        error,
        rows,
        fields,
      ) {
        resolve({ error, rows, fields })
      })
    })
  }

  const { error, rows } = await getDatabaseResults(pool)

  pool.end(function (_) {
    // All connections in the pool have ended
  });

  if (error) {
    return { error };
  } else {
    return { data: rows };
  }
}
