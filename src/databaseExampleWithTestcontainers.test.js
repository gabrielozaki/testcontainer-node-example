const { GenericContainer } = require('testcontainers');
const mariadb = require('mariadb');
const path = require('path');

const databaseExample = require('./databaseExample');

async function createMysqlContainer() {
  const databaseFiles = path.resolve('./docker-mysql-init/');
  return new GenericContainer('mariadb', '10.4.12')
    .withExposedPorts(3306)
    .withBindMount(databaseFiles, '/docker-entrypoint-initdb.d')
    .withEnv('MYSQL_ROOT_PASSWORD', 'root')
    .start();
}

jest.setTimeout(120000);
let pool;

describe('tests with testContainers', () => {
  let conn;
  let mysqlContainer;

  beforeAll(async() => {
    mysqlContainer = await createMysqlContainer();

    pool = mariadb.createPool({
      host: mysqlContainer.getContainerIpAddress(),
      port: mysqlContainer.getMappedPort(3306),
      user:'root',
      password: 'root',
      database: 'example_database',
      connectionLimit: 5
    });

    conn = await pool.getConnection();
  })

  it('should run workingFunction',async () => {
    await databaseExample.workingFunction(pool);

    const result1 = await conn.query("SELECT * FROM example_table WHERE id = 1");
    const result2 = await conn.query("SELECT * FROM example_table2 WHERE id = 1");

    expect(result1[0]).toEqual({id: 1, column1: 'example' });
    expect(result2[0]).toEqual({id: 1, id_example_table1: 1, column2: 'example2' });
  })

  it('should run brokenFunction',async () => {
    await databaseExample.brokenFunction(pool);

    const result1 = await conn.query("SELECT * FROM example_table WHERE id = 2");
    const result2 = await conn.query("SELECT * FROM example_table2 WHERE id = 2");

    expect(result1[0]).toEqual({id: 2, column1: 'example' });
    expect(result2[0]).toEqual({id: 2, id_example_table1: 2, column2: 'example2' });

  })

  afterAll(async() => {
    conn.end()
    await mysqlContainer.stop();
  })
});
