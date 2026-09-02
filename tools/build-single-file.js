/* Builds a single self-contained page from index.html + assets.
   Used for the hosted preview, which cannot reference local files.
   Run: node tools/build-single-file.js  ->  dist/preview.html      */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');

const html = read('index.html');
const css = read('assets/css/styles.css');
const js = read('assets/js/main.js');

/* The live page keeps its SEO title. The preview is named for the
   gallery it gets listed in, so it uses the company name alone. */
const title = 'Additive Manufacturing &amp; Engineering';
const fontLinks = (html.match(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/g) || []).join('\n');
const preconnect = (html.match(/<link rel="preconnect"[^>]*>/g) || []).join('\n');
const body = html.match(/<body>([\s\S]*)<\/body>/)[1]
  .replace(/<script src="assets\/js\/main\.js" defer><\/script>/, '');

const out = `<title>${title}</title>
${preconnect}
${fontLinks}
<style>
${css}
</style>
${body}
<script>
${js}
</script>
`;

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist/preview.html'), out);
console.log('dist/preview.html', out.length, 'bytes');
