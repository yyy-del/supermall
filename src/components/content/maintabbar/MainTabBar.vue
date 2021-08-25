<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home" active-color="#ff5a86">
        <template v-slot:item-active-icon>
          <img src="~@/assets/img/tabbar/home_active.svg" alt="" />
        </template>
        <template v-slot:item-icon>
          <img src="~@/assets/img/tabbar/home.svg" alt="" />
        </template>
        <div slot="item-text">首页</div>
      </tab-bar-item>

      <tab-bar-item path="/category" active-color="#ff5a86">
        <template v-slot:item-active-icon>
          <img src="~@/assets/img/tabbar/category_active.svg" alt="" />
        </template>
        <template v-slot:item-icon>
          <img src="~@/assets/img/tabbar/category.svg" alt="" />
        </template>
        <div slot="item-text">分类</div>
      </tab-bar-item>

      <tab-bar-item path="/cart" active-color="#ff5a86">
        <template v-slot:item-active-icon>
          <img src="~@/assets/img/tabbar/shopcart_active.svg" alt="" />
        </template>
        <template v-slot:item-icon>
          <img src="~@/assets/img/tabbar/shopcart.svg" alt="" />
        </template>
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" active-color="#ff5a86">
        <template v-slot:item-active-icon>
          <img src="~@/assets/img/tabbar/profile_active.svg" alt="" />
        </template>
        <template v-slot:item-icon>
          <img src="~@/assets/img/tabbar/profile.svg" alt="" />
        </template>
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>
<script>
import tabBar from "@/components/common/tabbar/tabBar.vue";
import tabBarItem from "@/components/common/tabbar/tabBarItem.vue";

export default {
  name: "MainTabBar",
  components: {
    tabBar,
    tabBarItem,
  },
};
</script>
<style scoped>
</style>