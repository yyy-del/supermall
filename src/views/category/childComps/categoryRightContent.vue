<template>
  <div class="content" v-if="subCategoryList">
    <div
      class="content-item"
      v-for="(item, index) in subCategoryList"
      :key="index"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad(index)" />
        <span>{{ item.title }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "categoryRightContent",
  props: {
    subCategoryList: {
      type: Array,
      default() {
        return [];
      },
    },
    currentIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    imgLoad(index) {
      const length = this.subCategoryList.length;
      // 图片加载完成  发射事件刷新scroll
      if (index === length - 1) {
        this.$emit("imgLoad");
      }
    },
  },
};
</script>

<style  scoped>
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 5px;
}
.content-item {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
}
.content-item img {
  width: 100%;
}
</style>
