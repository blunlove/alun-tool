import { ipcMain } from 'electron'
import { testIconZip, changeIconfontCss, pipeAsyncFunctions, mkdir, rmDir, rmFile, write } from './methods';
import axios from 'axios';
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
  }).then(() => {
    event.sender.send('syncIcon-reply', {
      code: 200,
      msg: '同步成功',
      success: true
    })
  })
})

function downloadFile(parmas) {
  parmas.localPath = parmas.localPath.replace(/\/|\\+/g, '/');
  let temp = parmas.localPath.split(/\/|\\+/g);
  parmas.fatherPath = temp.slice(0, temp.length - 1).join('/');
  return pipeAsyncFunctions(
    () => mkdir(parmas.fatherPath),
    () => {
      parmas.filePath = `${parmas.fatherPath}/${parmas.name}.zip`;
      let stream = fs.createWriteStream(parmas.filePath);
      let url = `https://www.iconfont.cn/api/project/download.zip?pid=${parmas.pid}&ctoken=${parmas.ctoken}`;
      return new Promise((resolve) => {
        axios({
          url,
          method: 'get',
          responseType: 'stream',
          headers: parmas.headers,
        }).then(res => {
          res.data.pipe(stream);
          stream.on("finish", () => resolve(parmas.filePath));
        })
      })
    },
    () => testIconZip(parmas),
    () => changeIconfontCss(parmas)
  )().catch(err => {
    console.log(err)
  });
}
