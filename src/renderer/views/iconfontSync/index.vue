<template>
  <div class="iconfont-sync">
    iconfont-sync
    <base-input v-model="data"></base-input>
  </div>
</template>

<script>
import fs from 'fs';
import path from 'path';
export default {
  name: 'iconfont-sync',
  data() {
    return {
      data: ''
    }
  },
  mounted() {
    let file = fs.readFileSync(path.join(__dirname, './index.vue'), 'utf-8');
    console.log(file);
  },
};
</script>

<style lang="less" scoped>
</style>