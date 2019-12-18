<template>
  <div class="iconfont-sync">
    <el-button @click="editConfig" type="primary">编辑配置</el-button>
    <el-button type="primary">一键同步</el-button>
    <edit-config ref="editConfig"></edit-config>
  </div>
</template>

<script>
import editConfig from './editConfig';
import { setLocalStorageItem } from '../../utils';
export default {
  name: 'iconfont-sync',
  data() {
    return {
      cookie: '',
    }
  },
  components: {
    editConfig
  },
  methods: {
    editConfig() {
      this.$refs.editConfig.openFrame();
      setLocalStorageItem('iconfont-cookie', this.cookie);
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