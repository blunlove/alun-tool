<template>
  <al-content-box title="bilibili图床" background="tomato">
    <div class="index">
      <div class="index-file">
        <el-upload
          drag
          multiple
          ref="upload"
          action="/bilibili"
          accept="image/*,gif,jpg,jpeg,bmp,png"
          name="file_up"
          :data="{
            category: 'daily',
            biz: 'draw'
          }"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :auto-upload="false"
          :file-list="fileList">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="button inline" slot="tip">
            <el-button @click="() => this.$refs.editCookie.openFrame()">编辑cookie</el-button>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
      <edit-cookie ref="editCookie"></edit-cookie>
    </div>
  </al-content-box>
</template>

<script>
import editCookie from './editCookie';
import {getLocalStorageItem, setCookiesItem} from 'alun-utils';
import uploadFile from 'node-upload-file';
import fs from 'fs';
export default {
  name: 'index',
  components: {
    editCookie
  },
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    beforeUpload(file) {
      if (!['.gif', '.jpg', '.jpeg', '.bmp', '.png'].some(type => file.name.endsWith(type))) {
        this.$message.error('图片格式错误');
        this.fileList.pop();
        return false;
      } else {
        return true;
      }
    },
    onChange(file, fileList) {
      console.log(file);
      this.fileList = fileList;
      if (this.beforeUpload(file)) {
        this.submitUpload(file);
      }
    },
    submitUpload(file) {
      let data = getLocalStorageItem('bilibili') || {};
      if (!data.cookie) return this.$message.error('b站cookie未填写');
      let buffer = fs.readFileSync(file.raw.path);
      let files = uploadFile.file('image.jpg');
      files._buffer = buffer;
      uploadFile.post(`https://api.vc.bilibili.com/api/v1/drawImage/upload`, {
        category: 'daily',
        biz: 'draw',
        file_up: files
      }, true, {
        cookie: data.cookie,
      }, function (result, data) {
        if (result) {
          data = JSON.parse(data.toString());
          if (data.message === 'success') {
            file.status = 'success';
          }
          console.log(data);
        } else {
          console.log(data);
        }
      });
    },
  }
};
</script>

<style lang="less" scoped>
.index {
  .button {
    margin-left: 10px;
    vertical-align: top;
  }
  &-upload {}
}
</style>