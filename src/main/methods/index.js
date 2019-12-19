const fs = require('fs');
const JSzip = require('jszip');
const uploadPath = 'djcps_web/icons';

exports.testIconZip = function(filePath) {
  let zip = new JSzip();
  let file = fs.readFileSync(filePath);
  return zip.loadAsync(file).then(_zip => {
    let zipFiles = Object.keys(_zip.files);
    if (['iconfont.css', 'demo.css'].every(name => zipFiles.find(ket => ket.includes(name)))) {
      return Promise.resolve(filePath);
    } else {
      return Promise.reject(`图标资源目录格式错误`);
    }
  })
}

exports.changeIconfontCss = function(path) {
  let cssFile = fs.readFileSync(path, 'utf8');
  let reg = /\.([^ ]+)(?= \{[^\{]+\})/;
  cssFile = cssFile.replace(reg, str => {
    str = str.replace('.', '');
    return `[class*=" ${str}"], [class^=${str}]`;
  });
  fs.writeFileSync(path, cssFile);
}

exports.writeIndexCss = function() {
  let iconsDir = fs.readdirSync(uploadPath).filter(dir => fs.statSync(`${uploadPath}/${dir}`).isDirectory());
  fs.writeFileSync(`${uploadPath}/index.css`, iconsDir.reduce((sum, val) => {
    sum += `@import './${val}/iconfont.css';\n`;
    return sum;
  }, ''));
}

exports.uploadPath = uploadPath;