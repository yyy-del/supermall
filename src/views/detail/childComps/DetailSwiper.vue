<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="" />
    </van-swipe-item>
  </van-swipe>
</template>
<script>
export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.my-swipe .van-swipe-item {
  height: 300px;
}
.van-swipe-item img {
  width: 100%;
}
</style>