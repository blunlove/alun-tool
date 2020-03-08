<template>
  <al-dialog ref="dialog" width="600px" title="cookie" @closed="closed" @close="close" @confirm="confirm">
    <al-form ref="alForm" :form-data="baseData" :form-options="formOptions"></al-form>
  </al-dialog>
</template>

<script>
import {formRules as rules, setLocalStorageItem, getLocalStorageItem} from 'alun-utils';
export default {
  name: 'editCookie',
  data() {
    return {
      baseData: {},
      formOptions: [
        {
          type: 'al-input',
          formItem: {
            prop: 'cookie',
            label: 'cookie',
            // rules: [rules.required('b站cookie不能为空')],
          },
          attrs: {
            rows: 4,
            type: 'textarea'
          }
        },
      ]
    }
  },
  methods: {
    openFrame() {
      this.baseData = getLocalStorageItem('bilibili') || {};
      this.$refs.dialog.open();
    },
    confirm() {
      this.$refs.alForm.validate().then(() => {
        setLocalStorageItem('bilibili', this.baseData);
        this.close();
      })
    },
    closed() {
      this.baseData = {};
    },
    close() {
      this.$refs.dialog.close();
    },
  }
};
</script>

<style lang="less" scoped>

</style>