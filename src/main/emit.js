import { ipcMain } from 'electron'
import Crawler from 'crawler';
import { testIconZip } from './methods';
import request from 'request';
import path from 'path';
import fs from 'fs';

ipcMain.on('syncIcon', (event, a, b, c) => {
  let cookie = a.cookie.split(';').reduce((sum, item) => {
    let temp = item.trim().split('=');
    return Object.assign(sum, {[temp[0]]: temp[1]});
  }, {});
  let headers = {
    cookie: a.cookie,
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36'
  }
  // console.log(a);
  // console.log(headers);
  // let distPath = path.join(__dirname, `./dist`);
  // fs.existsSync(distPath) || fs.mkdirSync(distPath);
  return api({
    url: `https://www.iconfont.cn/api/user/myprojects.json`,
    headers,
    data: {
      t: Date.now(),
      ctoken: cookie.ctoken
    }
  }).then(res => {
    let ownProjects = res.body.data.ownProjects;
    let iconStore = ownProjects.find(item => item.name === a.iconStoreName);
    return downloadFile({
      pid: iconStore.id,
      ctoken: cookie.ctoken,
      name: iconStore.name,
      headers
    })
  }).then(path => {
    event.sender.send('syncIcon-reply', {
      code: 200,
      msg: '同步成功',
      success: true
    })
  })
})

function downloadFile(parmas) {
  let filePath = path.join(__dirname, `./${parmas.name}.zip`);
  let stream = fs.createWriteStream(filePath);
  console.log(parmas);
  let url = `https://www.iconfont.cn/api/project/download.zip?pid=${parmas.pid}&ctoken=${parmas.ctoken}`;
  return new Promise((resolve, reject) => {
    request(url, {
      headers: parmas.headers
    }).pipe(stream).on('close', function (err) {
      if (err) {
        // console.log(err);
        reject('无法获取资源包');
      } else {
        resolve(testIconZip(filePath))
      }
    });
  })
}

function api(options) {
  return new Promise((resolve, reject) => {
    let craw = new Crawler(Object.assign(options, {callback: (error, res, done) => {
      if (error) {
        reject(error);
      } else {
        if (res.headers['content-type'].includes('application/json')) {
          res.body = JSON.parse(res.body);
          if (res.body.data) {
            resolve(res);
          }
        }
        reject('无法获取iconfont数据，请确认cookie是否失效');
      }
      done();
    }}));
    if (options.data) {
      Object.keys(options.data).forEach((key, index) => {
        options.url += `${index === 0 ? '?' : '&'}${key}=${options.data[key]}`;
      });
    }
    craw.queue(options.url);
  })
}