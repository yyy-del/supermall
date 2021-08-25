<template>
  <div class="cart">
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <cart-list />
    <cart-bottom-bar />
  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import { mapGetters } from "vuex";

import CartList from "./childComps/cartList.vue";
import CartBottomBar from "./childComps/cartBottomBar.vue";
export default {
  name: "cart",
  components: {
    NavBar,

    CartList,
    CartBottomBar,
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
};
</script>
<style scoped>
.cart-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>