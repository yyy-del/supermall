<template>
  <div class="goods-list-item" @click="itemClick">
    <img :src="showImages" alt="" @load="imageLoad" />
    <div class="messages">
      <p>{{ goodsItem.title }}</p>
      <div class="bottom-messages">
        <span class="price">{{ goodsItem.price }}</span>
        <span class="cfav">{{ goodsItem.cfav }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImages() {
      return (
        this.goodsItem.image || this.goodsItem.img || this.goodsItem.show.img
      );
    },
  },
  methods: {
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
    imageLoad() {
      this.$bus.$emit("itemImgLoad");
    },
  },
};
</script>
<style scoped>
.goods-list-item {
  position: relative;
  padding-bottom: 40px;
  width: 48%;
}
.goods-list-item img {
  border-radius: 5px;
  width: 100%;
}
.messages {
  margin-top: 8px;
}
.messages p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 5px;
}
.bottom-messages {
  position: absolute;
  bottom: -2px;
  position: relative;
}
.messages .price {
  position: absolute;
  color: var(--color-tint);
  width: 50%;
  left: 0px;
  padding-right: 2px;
}
.messages .cfav {
  position: absolute;
  right: 0;
  width: 50%;
  padding-right: 60px;
}
.messages .cfav::before {
  content: "";
  position: absolute;
  bottom: 3px;
  width: 14px;
  height: 14px;
  left: -16px;
  background: url(~@/assets/img/common/collect.svg) 0 0/14px 14px;
}
</style>