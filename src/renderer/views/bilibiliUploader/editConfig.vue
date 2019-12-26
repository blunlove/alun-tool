<template>
  <div class="edit-config">
    <base-dialog ref="baseDialog" title="编辑配置" @confirm="confirm" @close="close" @closed="closed">
      <div class="edit-config-content">
        <div class="edit-config-content-item" v-for="item in config">
          <label>{{ item.label || item.key }}</label>
          <div>
            <div :is="item.compType" v-bind="item.attrs" v-model="data[item.key]"></div>
          </div>
        </div>
      </div>
    </base-dialog>
  </div>
</template>

<script>
import {setLocalStorageItem, getLocalStorageItem} from '../../utils';
export default {
  name: 'edit-config',
  data() {
    return {
      data: {},
      config: [
        {
          compType: 'el-input',
          attrs: {
            type: 'textarea',
          },
          key: 'cookie',
        },
        {
          compType: 'el-input',
          key: 'uploadPath',
        },
      ]
    }
  },
  methods: {
    openFrame() {
      this.$refs.baseDialog.open();
      this.data = getLocalStorageItem('bilibili') || {};
    },
    confirm() {
      setLocalStorageItem('bilibili', this.data);
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
    width: 650px;
    &-item {
      display: flex;
      & + & {
        margin-top: 10px;
      }
      label {
        display: inline-block;
        padding-right: 10px;
        line-height: 40px;
        width: 120px;
        text-align: right;
        font-weight: bold;
      }
      & > div {
        flex: 1;
        display: flex;
        align-items: center;
        /deep/ textarea.el-textarea__inner {
          height: 100px;
        }
      }
    }
  }
}
</style>