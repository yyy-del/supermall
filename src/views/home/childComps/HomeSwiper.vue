<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad"
        /></a>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  name: "HomeSwiper",
  data() {
    return {
      isLoad: false,
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  methods: {
    imgLoad() {
      if (!this.isLoad) {
        this.$emit("imgIsLoad");
        this.isLoad = true;
      }
    },
  },
  created() {},
};
</script>
<style scoped>
.my-swipe .van-swipe-item {
  width: 100%;
}
.van-swipe-item img {
  width: 100%;
}
</style>