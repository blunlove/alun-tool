import fs from 'fs';
import JSzip from 'jszip';
import { mkdir, rmDir, write, pipeAsyncFunctions } from '../methods';

export const testIconZip = function(parmas) {
  let zip = new JSzip();
  let file = fs.readFileSync(parmas.filePath);
  let zipFiles = [];
  pipeAsyncFunctions(
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