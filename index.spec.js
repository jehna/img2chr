const { expect } = require('chai')
const { writeTile, getUintValue } = require('./index')

describe('writeTile', () => {
  it('should export a function', () => {
    expect(writeTile).to.be.a('function')
  })

  it('should return a buffer with 16 zeros', () => {
    const zeros = '00000000000000000000000000000000'
    expect(writeTile().toString('hex')).to.eql(zeros)
  })

  it('should return a buffer filled with true bits if passed an array of 3s', () => {
    const ones = 'ffffffffffffffffffffffffffffffff'
    const input = Array(8 * 8).fill(3)
    expect(writeTile(input).toString('hex')).to.eql(ones)
  })

  it('should return a correct buffer for 1', () => {
    const result = '00000000000000008000000000000000'
    const input = Array(8 * 8).fill(0)
    input[0] = 1

    expect(writeTile(input).toString('hex')).to.eql(result)
  })

  it('should return a correct buffer for 2', () => {
    const result = '80000000000000000000000000000000'
    const input = Array(8 * 8).fill(0)
    input[0] = 2

    expect(writeTile(input).toString('hex')).to.eql(result)
  })

  it('should return a correct buffer for 3', () => {
    const result = '80000000000000008000000000000000'
    const input = Array(8 * 8).fill(0)
    input[0] = 3

    expect(writeTile(input).toString('hex')).to.eql(result)
  })

  it('should return a correct buffer for two ones', () => {
    const result = '00000000000000008080000000000000'
    const input = Array(8 * 8).fill(0)
    input[0] = 1
    input[8] = 1

    expect(writeTile(input).toString('hex')).to.eql(result)
  })

  it('should return a correct buffer for full ones', () => {
    const result = '0000000000000000ffffffffffffffff'
    const input = Array(8 * 8).fill(1)

    expect(writeTile(input).toString('hex')).to.eql(result)
  })
})

describe('getUintValue', () => {
  it('should export a function', () => {
    expect(getUintValue).to.be.a('function')
  })

  it('should return 0 when no value passed', () => {
    expect(getUintValue([])).to.eql(0)
  })

  it('should return 1 when passed 1', () => {
    expect(getUintValue([1])).to.eql(1)
  })

  it('should return 3 when passed (1,1)', () => {
    expect(getUintValue([1, 1])).to.eql(3)
  })

  it('should return complex binary value', () => {
    const input = [1, 1, 0, 1, 1, 0, 0, 1]
    expect(getUintValue(input)).to.eql(parseInt(input.join(''), 2))
  })

  it('should return correct value when only one 1 is passed', () => {
    const input = [1, 0, 0, 0, 0, 0, 0, 0]
    expect(getUintValue(input)).to.eql(128)
  })
})
