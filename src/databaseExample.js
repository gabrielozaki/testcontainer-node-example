/*
Adapted example from:
https://mariadb.com/kb/en/getting-started-with-the-nodejs-connector/
 */
async function workingFunction(pool) {
  let conn;
  try {
    conn = await pool.getConnection();

    await conn.query("INSERT INTO example_table value (?, ?)", [1, "example"]);
    await conn.query("INSERT INTO example_table2 value (?, ?, ?)", [1, 1 , "example2"]);

  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

async function brokenFunction(pool) {
  let conn;
  try {
    conn = await pool.getConnection();

    await conn.query("INSERT INTO example_table value (?, ?)", [2, "example"]);
    await conn.query("INSERT INTO example_table2 value (?, ?, ?)", [2, 3 , "example2"]);

  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

module.exports ={
  workingFunction, brokenFunction
}
