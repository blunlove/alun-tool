<template>
  <al-content-box :title="$route.meta.title" background="gold">
    <div class="iconfont-sync">
      <el-button type="primary" @click="editConfig">编辑配置</el-button>
      <el-button type="primary" @click="syncIcons" :loading="isLoading">一键同步</el-button>
      <edit-config ref="editConfig"></edit-config>
    </div>
  </al-content-box>
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
    ipcRenderer.on('syncIcon-reply', this.listenerEvent);
  },
  destroyed() {
    ipcRenderer.removeListener('syncIcon-reply', this.listenerEvent)
  },
  methods: {
    editConfig() {
      this.$refs.editConfig.openFrame();
    },
    listenerEvent(event, res) {
      this.$message.success(res.msg);
      this.isLoading = false;
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
