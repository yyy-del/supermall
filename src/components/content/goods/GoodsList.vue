<template>
  <div class="goods-list">
    <good-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goods-item="item"
    />
  </div>
</template>
<script>
import GoodListItem from "./GoodListItem.vue";
export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodListItem,
  },
};
</script>
<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: space-around;
}
</style>