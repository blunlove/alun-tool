<template>
  <div class="iconfont-sync">
    <div class="iconfont-sync-cookie">
      <el-input v-model="cookie" type="textarea"></el-input>
    </div>
    <el-button @click="saveCookie" type="primary">保存cookie</el-button>
  </div>
</template>

<script>
import { setLocalStorageItem } from '../../utils';
export default {
  name: 'iconfont-sync',
  data() {
    return {
      cookie: '',
    }
  },
  methods: {
    saveCookie() {
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