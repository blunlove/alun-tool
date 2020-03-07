<template>
  <div class="iconfont-sync">
    <el-button type="primary" @click="editConfig">编辑配置</el-button>
    <el-button type="primary" @click="syncIcons" :loading="isLoading">一键同步</el-button>
    <edit-config ref="editConfig"></edit-config>
  </div>
</template>

<script>
import editConfig from './editConfig';
import {ipcRenderer} from 'electron';
import {getLocalStorageItem} from 'alun-utils';

export default {
  name: 'iconfont-sync',
  data() {
    return {
      isLoading: false
    }
  },
  components: {
    editConfig
  },
  mounted() {
    ipcRenderer.on('syncIcon-reply', (event, res) => {
      this.$message.success(res.msg);
      this.isLoading = false;
    });
  },
  methods: {
    editConfig() {
      this.$refs.editConfig.openFrame();
    },
    syncIcons() {
      this.isLoading = true;
      ipcRenderer.send('syncIcon', getLocalStorageItem('iconfont'));
    }
  },
};
</script>

<style lang="less" scoped>
.iconfont-sync {
  &-cookie {
    display: inline-block;
    vertical-align: top;
    width: 500px;
  }
}
</style>
