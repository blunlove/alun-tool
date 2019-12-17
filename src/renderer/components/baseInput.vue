<template>
  <div class="base-input">
    <div class="base-input-label" v-if="title">
      {{ title }}
    </div>
    <div class="base-input-value">
      <number-input v-if="['number', 'float', 'input', 'input_weight'].find(item => item == type)" v-bind="_props" @input="valueChange" title></number-input>
      <textarea-input v-else-if="type == 'textarea'" v-bind="_props" @input="valueChange" title></textarea-input>
      <time-range v-else-if="type == 'timerange'" v-bind="_props" @change="valueChange" title></time-range>
      <date-range v-else v-bind="_props" @change="valueChange" title></date-range>
    </div>
  </div>
</template>

<script>
  import dateRange from './dateRange.vue';
  import numberInput from './numberInput/numberInput.vue';
  import textareaInput from './textInput/textareaInput.vue';
  import timeRange from './timeRange.vue';
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
      dateRange,
      timeRange,
      numberInput,
      textareaInput
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
