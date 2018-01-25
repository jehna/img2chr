# img2chr
> Convert images to NES chr format

Convert any PNG, JPEG or GIF files to 8-bit Nintendo Entertainment System's CHR
format.

## Quick start

Install the package globally to your machine by running:

```shell
npm install -g img2chr
```

After this you can run the `img2chr` from anywhere to convert your images to
.chr format:

```shell
img2chr image.png output.chr
```

This converts the file `image.png` to `output.chr`.

### Using as a dependency

You can also use img2chr as a normal NPM dependency:

```shell
npm install img2chr --save
```

This installs the package as a local dependency, after which you can require it
in your JavaScript file:

```js
const { img2chr } = require('img2chr')

img2chr('image.png', 'output.chr')
```

This script above reads the file `image.png` and saves it as `output.chr`.

## Features

This is a simple tool that:
* Converts your images to .chr files
* Reads PNG, GIF and JPG files
* Converts image to grayscale and uses different grey values as index colors
* Was created because there was no such tool yet for Node.js
* Was initially needed for a NES game development for [Global Game
  Jam](https://globalgamejam.org/) 2018

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

## Licensing

The code in this project is licensed under MIT license.
