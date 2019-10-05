import { expect } from 'chai';

describe('Basic Mocha String Test', () => {
  it('should return number of charachters in a string', () => {
    expect('Hello').to.have.lengthOf(5);
  });
});
