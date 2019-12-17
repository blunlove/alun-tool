<template>
  <div class="number-input">
    <input :class="['special-input', {'disabled': disabled}]"
      v-model="query"
      :placeholder="placeholder"
      :maxlength="maxlength"
      @input="checkNumber"
      :disabled="disabled">
  </div>
</template>

<script>
export default {
  name: 'number-input',
  props: {
    type: {
      default: ''
    },
    value: {
      default: ''
    },
    placeholder: {
      default: '请输入内容'
    },
    maxlength: {
      default: 40
    },
    disabled: {
      default: false
    },
  },
  data() {
    return {
      query: '',
    }
  },
  beforeMount () {
    this.query = this.value !== 0 ? this.value || '' : 0;
  },
  methods: {
    checkNumber() {
      if (this.type == 'number') {
        this.query = this.query.replace(/\D/g, '');
      } else if (this.type == 'float') {
        this.query = this.query.replace(/[^(0-9)|.]/g, '');
        let temp = this.query.split('.');
        temp = temp.slice(0, 2);
        temp[0] = temp[0].slice(0, 9);
        temp[1] ? temp[1] = temp[1].slice(0, 2) : '';
        this.query = temp.join('.');
        this.query = this.query === '.' ? '' : this.query;
      } else if (this.type == 'input') {
        this.query = this.query.replace(/\s+/g, '');
      } else if (this.type == 'input_weight') {
        this.query = this.query.replace(/[^(0-9)|/]/g, '');
      }
      this.$emit('input', this.query);
    },
  },
  watch: {
    'value'(newValue, oldValue) {
      this.query = newValue;
    }
  }
}
</script>

<style lang="scss" scoped>
.number-input {
  .special-input {
    box-sizing: border-box;
    width: 200px;
    height: 36px;
    border: 1px solid #bfcbd9;
    background-color: #fff;
    padding-left: 10px;
    border-radius: 4px;
    font-size: 14px;
    &:focus {
      border-color: #20a0ff;
    }
    &::-webkit-input-placeholder {
      padding-right: 10px;
      color: #97a8be;
    }
    &.disabled {
      background-color: #eef1f6;
      border-color: #d1dbe5;
      color: #bbb;
      &::-webkit-input-placeholder {
        color: #bdcbd9;
      }
    }
  }
}
</style>
