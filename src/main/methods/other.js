import fs from 'fs';
import JSzip from 'jszip';

export const testIconZip = function(filePath) {
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