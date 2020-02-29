const CleanCSS = require('clean-css');
const fs = require('fs-extra');
const path = require('path');

// ref https://dev.to/mathieuhuot/processing-sass-with-11ty-5a09
module.exports = (srcPath, distPath) => {
    const src = fs.readFileSync(srcPath, 'utf8');

    if(!fs.existsSync(path.dirname(distPath))) {
        const result = new CleanCSS({}).minify(src);
        fs.mkdir(path.dirname(distPath), {recursive: true})
          .then(() => fs.writeFile(distPath, result))
          .catch(error => console.error(error))
    }
}
