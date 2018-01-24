const { Buffer } = require('buffer')

function writeTile(colors = Array(8 * 8).fill(0)) {
  const buffer = Buffer.allocUnsafe(16)

  for (let row = 0; row < 8; row++) {
    const index = row * 8
    const highBits = getUintValue(
      colors.slice(index, index + 8).map(v => (v & 2 ? 1 : 0))
    )
    buffer.writeUInt8(highBits, row)
  }

  for (let row = 0; row < 8; row++) {
    const index = row * 8
    const lowBits = getUintValue(colors.slice(index, index + 8).map(v => v & 1))
    buffer.writeUInt8(lowBits, row + 8)
  }

  return buffer
}

function getUintValue(values) {
  let result = 0
  for (let i = 0; i < values.length; i++) {
    result |= values[i] << (values.length - 1 - i)
  }
  return result
}

module.exports = {
  writeTile,
  getUintValue
}
