<template>
  <div class="layout">
    <div class="layout-header">
      <div class="layout-header-item" v-for="item in menus" @click="changeMenu(item)">
        {{ item.meta.title }}
      </div>
    </div>
    <div class="layout-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { menus } from '../router';
export default {
  name: 'layout',
  data() {
    return {
      menus
    }
  },
  methods: {
    changeMenu(menu) {
      this.$router.push(menu.url);
    }
  }
};
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  &-header {
    background-color: #3d3d3d;
    &-item {
      display: inline-block;
      padding: 10px 20px;
      color: white;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
  &-content {
    flex-grow: 1;
    padding: 10px;
  }
}
</style>