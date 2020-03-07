<template>
  <div class="bilibili-uploader">
    <el-button type="primary" @click="editConfig">编辑配置</el-button>
    <el-button type="success" @click="submitUpload">上传图片</el-button>
    <!-- <base-table :table-columns="tableColumns" :table-data="tableData"></base-table> -->
    <edit-config ref="editConfig"></edit-config>
    <!-- <el-upload
      ref="upload"
      class="upload-demo"
      drag
      accept="image/*,gif,jpg,jpeg,bmp,png"
      action="https://api.vc.bilibili.com/api/v1/drawImage/upload"
      name="file_up"
      :on-change="onChange"
      :on-success="uploadSuccess"
      :data="uploadData"
      :auto-upload="false"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload> -->
  </div>
</template>

<script>
import {setLocalStorageItem, getLocalStorageItem} from 'alun-utils';
// import uploadFile from 'node-upload-file';
import editConfig from './editConfig';
export default {
  name: 'bilibili-uploader',
  data() {
    return {
      uploadData: {
        category: 'daily',
        biz: 'draw'
      },
      tableColumns: [
        {
          prop: 'imagePath',
          // render: (h, {props: {row, col}}) => <el-input>{row[col.prop]}</el-input>
        }
      ],
      tableData: [],
      fileList: []
    }
  },
  components: {
    editConfig
  },
  methods: {
    uploadSuccess(res, file) {
      console.log(res, file);
    },
    submitUpload() {
      let file = this.fileList[0].raw;
      console.log(file);
      var reader = new FileReader();
      reader.readAsArrayBuffer(new Blob([file], {type: 'text/plain'}));
      reader.οnlοad = (e) => {
        var buffer = new Uint8Array(reader.result);
        console.log(buffer);
        // let files = uploadFile.file('image.jpg');
        // files._buffer = buffer;
        // uploadFile.post(`https://api.vc.bilibili.com/api/v1/drawImage/upload`, {
        //   category: 'daily',
        //   biz: 'draw',
        //   file_up: files
        // }, true, {
        //   cookie: 'SESSDATA=b613a158%2C1579666099%2Cd19c6fc1;'
        // }, function (result, data) {
        //   if (result) {
        //     data = JSON.parse(data.toString());
        //     if (data.success) {
        //       console.log(data.msg);
        //     } else {
        //       console.log(`上传失败: ${data.msg}`);
        //     }
        //   } else {
        //     console.log(data);
        //   }
        // });
      }
      // let data = getLocalStorageItem('bilibili') || {};
      // data.cookie.split(';').forEach(cok => {
      //   document.cookie = cok;
      // })
      // this.$refs.upload.submit();
    },
    onChange(file, fileList) {
      this.fileList = fileList;
    },
    editConfig() {
      this.$refs.editConfig.openFrame();
    },
  },
};
</script>

<style lang="less" scoped>
</style>