<template>
  <div class="base-menu">  
    <div class="base-menu-content">
      <div :class="['base-menu-content-item', {active: $route.path === item.path}]" v-for="item in menus" @click="gotoRoute(item)">
        <i :class="['icon', item.meta.icon]"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { menus } from '../../../router';
export default {
  name: 'baseMenu',
  data() {
    return {
      menus,
      config: [
        {
          icon: 'fa fa-bolt',
          path: '/index',
        },
        {
          icon: 'fa fa-keyboard-o',
          path: '/baidu',
        },
        {
          icon: 'fa fa-rocket',
          path: '/craft',
        },
        {
          icon: 'fa fa-dribbble',
          path: '/2',
        },
        {
          icon: 'fa fa-plus-circle',
          path: '/3',
        },
      ]
    }
  },
  methods: {
    gotoRoute(item) {
      if (this.$route.path === item.path) return;
      this.$router.push(item.path);
    }
  }
};
</script>

<style lang="less" scoped>
.base-menu {
  display: inline-flex;
  width: 10%;
  height: 100%;
  align-items: center;
  &-content {
    flex: 1;
    text-align: center;
    &-item {
      display: block;
      padding: 30px 0;
      &:hover {
        cursor: pointer;
        .icon {
          opacity: 0.6;
          transform: scale(1.4);
        }
      }
      &.active {
        .icon {
          transform: scale(1.8);
        }
      }
      .icon {
        font-size: 30px;
        color: #fff;
        transition: all 0.5s;
      }
    }
  }
}
</style>