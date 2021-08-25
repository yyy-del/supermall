<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar class="tabbar" />
  </div>
</template>

<script>
import MainTabBar from "./components/content/maintabbar/MainTabBar";
export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style scoped>
@import "./assets/css/base.css";
.tabbar {
  position: relative; /*z-index需要有定位才能生效 */
  z-index: 100;
}
</style>
