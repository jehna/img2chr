const { Buffer } = require('buffer')
const getPixelsCb = require('get-pixels')
const fs = require('fs')

const IMAGE_WIDTH = 128
const IMAGE_HEIGHT = 256
const SPRITE_WIDTH = 8
const SPRITE_HEIGHT = 8

function getPixels(image) {
  return new Promise((resolve, reject) => {
    getPixelsCb(image, (err, pixels) => {
      if (err) {
        reject(err)
      } else {

        const grayscale = []
        for (let i = 0; i < pixels.data.length; i += pixels.shape[2]) {
          const numChannels = Math.min(3, pixels.shape[2])
          const avg = pixels.data.slice(i, i + numChannels).reduce((a, b) => a + b) / numChannels
          grayscale.push(avg)
        }

        resolve(grayscale)
      }
    })
  })
}

async function img2Chr(image, outFilename) {
  const pixels = await getPixels(image)
  const normalizedColorPixels = normalizeColors(pixels)
  const chr = writeFullImage(normalizedColorPixels)
  fs.writeFileSync(outFilename, chr)
}

function writeFullImage(pixels) {
  const size = pixels.length
  const spritesCount = size / (SPRITE_WIDTH * SPRITE_HEIGHT)
  const imageBuffers = []
  for (let i = 0; i < spritesCount; i++) {
    const sprite = getNthSprite(i, pixels)
    const tileBuffer = writeTile(sprite)
    imageBuffers.push(tileBuffer)
  }
  return Buffer.concat(imageBuffers)
}

function getNthSprite(n, pixels) {
  const spritesPerRow = IMAGE_WIDTH / SPRITE_WIDTH
  const x = (n % spritesPerRow) * SPRITE_WIDTH
  const y = Math.floor(n / spritesPerRow) * SPRITE_HEIGHT

  let sprite = []
  for(let yCursor = 0; yCursor < SPRITE_HEIGHT; yCursor++) {
    const yPos = y + yCursor
    const index = yPos * IMAGE_WIDTH + x
    sprite = sprite.concat(pixels.slice(index, index + SPRITE_WIDTH))
  }

  return sprite
}

function normalizeColors(pixels) {
  const colorMap = getUniques(pixels)

  if (colorMap.length > 4) {
    throw colorMap.length + " colors found! The max is 4! Colors: " + colorMap.join(', ')
  }

  return pixels.map(pixel => colorMap.indexOf(pixel))
}

function ndarr2dToArr (ndarr) {
  const arr = []
  for (let x = 0; x < ndarr.shape[0]; x++) {
    for (let y = 0; y < ndarr.shape[1]; y++) {
       arr.push(ndarr.get(y, x))
    }
  }
  return arr
}

function getUniques (arr) {
  return [...new Set(arr)]
}

function writeTile(colors = Array(8 * 8).fill(0)) {
  const buffer = Buffer.alloc(16)

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
  getUintValue,
  img2Chr
}
