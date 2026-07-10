const postcss = require('postcss');
const tailwindcss = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');
const fs = require('fs');
const path = require('path');

const inputFile = './style.css';
const outputFile = './dist/output.css';

function build() {
  fs.readFile(inputFile, (err, css) => {
    if (err) { console.error('Read error:', err); return; }

    postcss([tailwindcss, autoprefixer])
      .process(css, { from: inputFile, to: outputFile })
      .then(result => {
        if (!fs.existsSync('./dist')) fs.mkdirSync('./dist');
        fs.writeFile(outputFile, result.css, () => {});
        console.log(`[${new Date().toLocaleTimeString()}] CSS rebuilt`);
      })
      .catch(err => console.error('Build error:', err));
  });
}

let debounceTimer;
function onChange(filename) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    console.log(`[${new Date().toLocaleTimeString()}] Changed: ${filename}`);
    build();
  }, 100);
}

// Watch source CSS
fs.watch(inputFile, (_, filename) => onChange(filename ?? inputFile));

// Watch index.html and src/ for Tailwind class changes
fs.watch('./index.html', (_, filename) => onChange(filename ?? 'index.html'));
fs.watch('./src', { recursive: true }, (_, filename) => onChange(filename ?? 'src/'));

build();
console.log('Watching for changes...');
