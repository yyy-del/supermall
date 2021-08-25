<template>
  <div id="detailNavBar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~@/assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="center">
        <div
          class="titleItem"
          v-for="(item, index) in title"
          @click="itemClick(index)"
          :class="{ active: currentIndex === index }"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
export default {
  name: "DetailNavBar",
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: { NavBar },
  created() {},
  methods: {
    //选择title
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("itemClick", index);
    },
    //返回上一页
    backClick() {
      this.$router.back();
    },
  },
};
</script>
<style scoped>
.center {
  display: flex;
}
.center .titleItem {
  flex: 1;
}
.active {
  color: var(--color-hight-text);
}
.back img {
  margin-top: 12px;
}
</style>