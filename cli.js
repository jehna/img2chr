#!/usr/bin/env node

const { img2Chr } = require('./index')

const [,, inFilename, outFilename] = process.argv

img2Chr(inFilename, outFilename)