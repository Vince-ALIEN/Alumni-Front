const postcss = require('postcss');
const tailwindcss = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');
const fs = require('fs');

const inputFile = './style.css';
const outputFile = './dist/output.css';

fs.readFile(inputFile, (err, css) => {
  if (err) throw err;

  postcss([tailwindcss, autoprefixer])
    .process(css, { from: inputFile, to: outputFile })
    .then(result => {
      if (!fs.existsSync('./dist')) {
        fs.mkdirSync('./dist');
      }
      fs.writeFile(outputFile, result.css, () => {});
      console.log('CSS compiled successfully!');
    });
});