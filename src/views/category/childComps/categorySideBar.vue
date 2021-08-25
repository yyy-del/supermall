<template>
  <scroll class="slide" ref="scroll" v-show="categoryList">
    <div class="sidebar">
      <ul>
        <li
          v-for="(item, index) in categoryList"
          :key="index"
          @click="handleCategoryClick(index, item.maitKey, item.miniWallkey)"
          :class="{ active: currentIndex === index }"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll.vue";
export default {
  components: { Scroll },
  name: "categorySideBar",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    categoryList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  created() {},

  watch: {
    categoryList(value, i) {
      this.categoryList
        ? this.$nextTick(() => {
            this.$refs.scroll.refresh();
          })
        : "";
    },
  },

  methods: {
    handleCategoryClick(index, maitKey, miniWallkey) {
      this.currentIndex = index;
      const obj = {
        index,
        maitKey,
        miniWallkey,
      };

      this.$emit("handleCategoryClick", obj);
    },
  },
};
</script>
<style scoped>
.slide {
  position: relative;
  left: 0;
  overflow: hidden;
  height: calc(100vh - 44px - 49px);
}

.sidebar ul {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.sidebar ul li {
  width: 100px;
  font-size: 14px;
  height: 45px;
  line-height: 45px;
  color: #666;
  background-color: #eef5eebf;
}
.active {
  font-weight: 700;
  color: #ff5777;
  border-left: 3px solid #ff5777;
  background-color: #fff;
}
</style>

