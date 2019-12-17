<template>
  <div class="base-select">
    <div class="base-select-label" v-if="title">
      {{ title }}
    </div>
    <div class="base-select-value">
      <el-select v-model="query"
        :placeholder="'请选择'"
        @change="valueChange"
        :disabled="disabled"
        clearable>
        <el-option v-for="(item, index) in options"
          :key="index"
          :label="item.label"
          :value="item"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-select',
  props: ['value', 'title', 'service', 'disabled'],
  data() {
    return {
      query: '',
      options: []
    }
  },
  methods: {
    valueChange(item) {
      if (this.query) {
        this.$emit('select-label', item.label);
        this.$emit('select', item.value);
      } else {
        this.$emit('select-label', null);
        this.$emit('select', null);
      }
    },
    getOptions(val) {
      this.options = [];
      return this.service(val).then(res => {
        this.options = res;
        this.query = this.options.find(item => item.value === this.value);
      });
    }
  },
  watch: {
    value(newValue) {
      if (!newValue) {
        this.query = newValue;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-select {
  div {
    display: inline-block;
  }
  &-value {
    width: 200px;
  }
}
</style>
