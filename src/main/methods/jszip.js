const JSzip = require("jszip");
const fs = require('fs');

module.exports = {
  unZip: (filePath, unZipPath, option) => {
    const { rename = true } = option || {};
    let zip = new JSzip();
    let resourceMap = [];
    return fileMethods.read(filePath, false, false).then(data => {
      return zip.loadAsync(data);
    }).then(_zip => {
      return methods.pipeAsyncFunctions(...Object.keys(_zip.files).map(key => () => {
        let zipObj = _zip.files[key];
        if (rename) {
          zipObj._path = zipObj.name.replace(/[^\/]+(?=\/)/, unZipPath);
        } else {
          zipObj._path = unZipPath + '/' + zipObj.name;
        }
        if (zipObj.dir) {
          return fileMethods.mkdir(zipObj._path);
        } else {
          resourceMap.push({
            suffix: zipObj.name.match(/(?<=\.)[^\.]+$/)[0],
            path: '/' + zipObj._path,
          })
          return zip.file(zipObj.name).async("uint8array").then(data => {
            return fileMethods.write(zipObj._path, data, false);
          });
        }
      }))();
    }).then(() => {
      fileMethods.rmFile(filePath);
      return Promise.resolve({resourceMap});
    }).catch(e => {
      console.log(e);
      fileMethods.rmFile(filePath);
      return Promise.reject(e);
    });
  }
}