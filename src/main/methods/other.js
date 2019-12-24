import fs from 'fs';
import JSzip from 'jszip';
import { mkdir, rmDir, write, pipeAsyncFunctions } from '../methods';

export const testIconZip = function(parmas) {
  let zip = new JSzip();
  let file = fs.readFileSync(parmas.filePath);
  let zipFiles = [];
  return pipeAsyncFunctions(
    () => zip.loadAsync(file).then(_zip => {
      zipFiles = Object.keys(_zip.files);
      if (['iconfont.css', 'demo.css'].every(name => zipFiles.find(ket => ket.includes(name)))) {
        return Promise.resolve();
      } else {
        return Promise.reject(`图标资源目录格式错误`);
      }
    }),
    () => rmDir(parmas.localPath),
    () => mkdir(parmas.localPath),
    () => Promise.all([
      ...zipFiles.map(name => {
        let temp = name.split('/')[1];
        if (temp) {
          let fileUrl = parmas.localPath + '/' + name.split('/')[1]
          return zip.file(name).async('uint8array').then(data => {
            return write(fileUrl, data, false);
          })
        } else {
          return Promise.resolve();
        }
      })
    ])
  )().finally(() => rmDir(parmas.filePath));
}

export const changeIconfontCss = function(parmas) {
  let iconCssPath = `${parmas.localPath}/iconfont.css`;
  let iconCss = fs.readFileSync(iconCssPath, 'utf-8');
  let replaceStr = iconCss.match(/url.+data:application.+/);
  replaceStr = replaceStr ? replaceStr[0] : '';
  let fontFamily = iconCss.match(/font-family: "(.+)"/);
  fontFamily = fontFamily ? fontFamily[1] : '';
  replaceStr = `
@font-face {
  font-family: "${fontFamily}";
  src: ${replaceStr}
}`
  iconCss = iconCss.replace(/@font-face((?!})[\S\s])+}/, replaceStr);
  iconCss = iconCss.replace(/\.([^ ]+)/, str => {
    str = str.replace('.', '');
    return `[class*=" ${str}"], [class^=${str}]`;
  });
  return fs.writeFileSync(iconCssPath, iconCss);
}