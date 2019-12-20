import fs from 'fs';
import rimraf from 'rimraf';
import {pipeAsyncFunctions} from './seniorfunc.js';

//新建
export const mkdir = (path) => {
  if (fs.existsSync(path)) return Promise.resolve();
  let pathArray = path.split(/\/|\\/g);
  return pipeAsyncFunctions(...pathArray.map((item, index, arr) => () => {
    let tempPath = arr.slice(0, index + 1).join('/');
    fs.existsSync(tempPath) || fs.mkdirSync(tempPath);
  }))();
}
//删除文件夹
export const rmDir = (path) => {
  if (!fs.existsSync(path)) return Promise.resolve();
  return new Promise((resolve, reject) => {
    rimraf(path, err => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    });
  })
}
//删除文件
export const rmFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })
}
//写入
export const write = (url, data, isJson = true) => {
  let pathArray = url.split(/\/|\\/g);
  return mkdir(pathArray.slice(0, pathArray.length - 1).join('/')).then(() => {
    return new Promise((resolve, reject) => {
      fs.writeFile(url, isJson ? methods.formatJson(data) : data, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}
//读取
export const read = (url, isJson = true, utf8 = true) => {
  return new Promise((resolve, reject) => {
    fs.readFile(url, utf8 ? 'utf8' : undefined, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(isJson ? JSON.parse(data) : data);
      }
    });
  });
}