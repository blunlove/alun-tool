<template>
  <div class="edit-config">
    <base-dialog ref="baseDialog" @confirm="confirm" @close="close" @closed="closed">
      <div class="edit-config-content">
        <div class="edit-config-content-item" v-for="item in config">
          <label>{{ item.key }}</label>
          <div>
            <el-input :type="item.type" v-model="data[item.key]"></el-input>
          </div>
        </div>
      </div>
    </base-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'edit-config',
  computed: {
    ...mapGetters([
      'iconfont',
    ]),
  },
  data() {
    return {
      data: {},
      config: [
        {
          type: 'textarea',
          key: 'cookie',
        },
        {
          type: 'input',
          key: 'localPath',
        },
      ]
    }
  },
  methods: {
    openFrame() {
      this.$refs.baseDialog.open();
      this.data = {...this.iconfont};
    },
    confirm() {
      this.$store.dispatch('setIconfont', this.data);
      this.$message.success('修改成功');
      this.close();
    },
    close() {
      this.$refs.baseDialog.close();
    },
    closed() {},
  }
};
</script>

<style lang="less" scoped>
.edit-config {
  &-content {
    width: 400px;
    label {
      display: inline-block;
      width: 80px;
      text-align: right;
      font-weight: bold;
    }
  }
}
</style>