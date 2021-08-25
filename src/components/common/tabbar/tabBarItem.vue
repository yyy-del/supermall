<template>
  <div class="tabBar-item" @click="itemClick">
    <div v-if="isActive">
      <slot name="item-active-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon"></slot>
    </div>
    <div :style="activestyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "tabBarItem",
  props: {
    path: {
      type: String,
    },
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // activeOne: true,
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activestyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>
<style scoped>
.tabBar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tabBar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /* 去掉图片底部的距离 */
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>