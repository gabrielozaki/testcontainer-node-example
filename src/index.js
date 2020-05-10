const mariadb = require('mariadb');
const databaseExample = require('./databaseExample');

(async () => {

  const pool = mariadb.createPool({
    host: '127.0.0.1',
    user:'root',
    password: 'root',
    database: 'example_database',
    connectionLimit: 5
  });

  await databaseExample.workingFunction(pool);
  await databaseExample.brokenFunction(pool);

  return 0;
})();
