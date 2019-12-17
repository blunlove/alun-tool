<template>
  <div class="base-input">
    <div class="base-input-label" v-if="title">
      {{ title }}
    </div>
    <div class="base-input-value">
      <number-input v-bind="_props" @input="valueChange" title></number-input>
    </div>
  </div>
</template>

<script>
  import numberInput from './numberInput.vue';
  export default {
    name: 'base-input',
    props: ['title', 'value', 'type', 'disabled', 'maxlength', 'placeholder'],
    methods: {
      valueChange(val) {
        if (this.type == 'float') {
          val = val ? Number(val) : null;
        }
        this.$emit('input', val);
      },
    },
    components: {
      numberInput,
    }
  }
</script>

<style lang="scss" scoped>
.base-input {
  div {
    display: inline-block;
  }
  &-label {
    vertical-align: top;
    margin-top: 8px;
  }
  &-value {
    position: relative;
  }
  .el-input {
    width: 200px;
  }
}
</style>
