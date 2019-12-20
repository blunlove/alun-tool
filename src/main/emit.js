import { ipcMain } from 'electron'
import Crawler from 'crawler';
import { testIconZip, mkdir } from './methods';
import axios from 'axios';
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
  return axios({
    method: 'get',
    url: `https://www.iconfont.cn/api/user/myprojects.json`,
    headers,
    data: {
      t: Date.now(),
      ctoken: cookie.ctoken
    }
  }).then(res => {
    let ownProjects = res.data.data.ownProjects;
    let iconStore = ownProjects.find(item => item.name === a.iconStoreName);
    return downloadFile({
      pid: iconStore.id,
      ctoken: cookie.ctoken,
      name: iconStore.name,
      localPath: a.localPath,
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
  // console.log(parmas.localPath)
  // let temp = parmas.localPath.split('/').pop().join('/');
  return mkdir(parmas.localPath).then(() => {
    let filePath = `${parmas.localPath}/${parmas.name}.zip`;
    let stream = fs.createWriteStream(filePath);
    let url = `https://www.iconfont.cn/api/project/download.zip?pid=${parmas.pid}&ctoken=${parmas.ctoken}`;
    return new Promise((resolve) => {
      axios({
        url,
        method: 'get',
        responseType: 'stream',
        headers: parmas.headers
      }).then(res => {
        res.data.pipe(stream);
        stream.on("finish", () => resolve(filePath));
      })
    })
  }).then(testIconZip).catch(err => {
    console.log(err)
  })
}
