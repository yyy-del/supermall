<template>
  <div class="swiper-list">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in topImages" :key="index">
        <img :src="item" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
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
  width: 100%;
}
.van-swipe-item img {
  width: 100%;
  height: 300px;
  /*对图片进行剪切，保留原始比例：*/
  object-fit: cover;
  /*被替换元素的内容对象在元素框内的对齐方式。*/
  object-position: center top;
}
</style>