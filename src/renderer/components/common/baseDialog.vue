<template>
  <div class="base-dialog">
    <el-dialog
      top="0"
      :visible="dialogVisible"
      :close-on-click-modal="false"
      :modal="false"
      :append-to-body="true"
      @close="closeCallback"
      @closed="closed"
      @open="open"
      v-bind="$attrs"
      v-on="filterListeners">
      <template slot="title">
        <slot name="title">
          <span class="el-dialog__title">{{title}}</span>
        </slot>
      </template>
      <div class="base-dialog-content" v-if="isOpen">
        <slot>这是一段信息</slot>
      </div>
      <div class="base-dialog-footer" :class="hasFooter ? '' : 'has-footer'" slot="footer">
        <slot name="footer"  v-if="hasFooter">
          <el-button @click="closeCallback">取 消</el-button>
          <slot name="footer-confirm">
            <el-button type="primary" @click="confirm" :loading="loading">确 认</el-button>
          </slot>
        </slot>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'base-dialog',
    props: {
      title: {
        default: '标题'
      },
      hasFooter: {
        default: true
      },
      loading: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        dialogVisible: false,
        isOpen: false,
      };
    },
    computed: {
      filterListeners() {
        return ['close', 'open'].reduce((sum, key) => {
          delete sum[key];
          return sum;
        }, {...this.$listeners});
      },
    },
    methods: {
      confirm() {
        this.$emit('confirm');
      },
      open() {
        this.dialogVisible = true;
        this.isOpen = true;
      },
      closed() {
        this.isOpen = false;
      },
      closeCallback() {
        this.dialogVisible && this.$emit('close');
      },
      close() {
        this.dialogVisible = false;
      }
    }
  };
</script>
<style lang="less">
.el-dialog__wrapper {
  display: flex;
  align-items: center;
  .el-dialog {
    width: auto;
  }
}

</style>