const queryMock = jest.fn();
const connMock = {
  query: queryMock,
  end: jest.fn()
}
const poolMock = {
  getConnection: () => { return connMock}
}

const databaseExample = require('./databaseExample');

describe('tests with Mock', () => {
  beforeEach(() => {
    queryMock.mockClear();
  })

  it('should run workingFunction',async () => {
    await databaseExample.workingFunction(poolMock);
    expect(queryMock.mock.calls).toHaveLength(2);
  })

  it('should run brokenFunction',async () => {
    await databaseExample.brokenFunction(poolMock);
    expect(queryMock.mock.calls).toHaveLength(2);
  })
});
