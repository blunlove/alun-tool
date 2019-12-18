<template>
  <div class="iconfont-sync">
    <div class="iconfont-sync-cookie">
      <el-input v-model="cookie" type="textarea"></el-input>
    </div>
    <el-button @click="editConfig" type="primary">修改配置</el-button>
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