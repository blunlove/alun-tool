<template>
  <div class="layout fullbox">
    <base-menu></base-menu>
    <div class="layout-content inline">
      <transition
        name="slide-fade"
        mode="out-in"
        enter-active-class="animated bounceInRight faster"
        leave-active-class="animated bounceOutRight faster">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import baseMenu from './baseMenu';
export default {
  name: 'layout',
  components: {
    baseMenu
  }
};
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  &-content {
    position: relative;
    flex-grow: 1;
  }
}
</style>