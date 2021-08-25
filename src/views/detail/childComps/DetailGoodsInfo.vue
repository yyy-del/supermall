<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="detail-goods-info">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
        @load="goodsImgLoad"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailGoodsInfo",
  data() {
    return {};
  },
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    goodsImgLoad() {
      this.$emit("goodsImgLoad");
    },
  },
};
</script>
<style scoped>
.detail-goods-info {
  padding: 25px 8px;
  border-bottom: 5px solid #f2f5f8;
}
.info-desc {
  padding: 0 8px 0;
  font-size: 14px;
}
.info-key {
  font-weight: 700;
  margin: 5px 10px;
  font-size: 18px;
}
.info-desc .desc {
  text-indent: 2em;
}
.info-list img {
  width: 100%;
}
</style>
