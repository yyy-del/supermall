<template>
  <div class="category">
    <nav-bar class="category-nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="category-content">
      <div class="category-side-bar">
        <category-side-bar
          :category-list="categoryList"
          @handleCategoryClick="handleCategoryClick"
        />
      </div>
      <tab-control
        :tabcontroldata="['流行', '新款', '精选']"
        ref="tabControll1"
        @itemclick="itemclick"
        v-show="isShow"
        class="showtabControl"
      />
      <scroll
        class="scroll_height"
        ref="scroll"
        :probe-type="3"
        @scroll="contentscroll"
      >
        <category-right-content
          :sub-category-list="subCategoryList"
          @imgLoad="imgLoad"
        />
        <tab-control
          :tabcontroldata="['流行', '新款', '精选']"
          @itemclick="itemclick"
          ref="tabControll2"
        />
        <goods-list :goods="categoryDetailList" />
      </scroll>
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";

import CategorySideBar from "./childComps/categorySideBar.vue";
import CategoryRightContent from "./childComps/categoryRightContent.vue";

import {
  getAllCategory,
  getSubCategory,
  getCategoryDetail,
} from "@/network/category.js";
import TabControl from "../../components/content/tabcontrol/TabControl.vue";
import GoodsList from "../../components/content/goods/GoodsList.vue";

export default {
  name: "category",
  data() {
    return {
      categoryList: [],
      subCategoryList: [],
      categoryDetailList: [],
      currentItemType: "pop",
      currentIndex: 0,
      tabOffsetTop: 0,
      isShow: false,
    };
  },
  components: {
    NavBar,
    CategorySideBar,
    Scroll,
    CategoryRightContent,
    TabControl,
    GoodsList,
  },
  created() {
    // 获取分类列表数据
    this.getAllCategory();
  },
  methods: {
    // 获取全部分类列表数据
    getAllCategory() {
      getAllCategory().then((res) => {
        //获取分类清单
        this.categoryList = res.data.category.list;
        this.$nextTick(() => {
          this.getSubcategory(this.categoryList[this.currentIndex].maitKey);
          this.getCategoryDetail(
            this.categoryList[this.currentIndex].miniWallkey,
            this.currentItemType
          );
        });
      });
    },
    //获取每一类对应图片数据
    getSubcategory(key) {
      getSubCategory(key).then((res) => {
        this.subCategoryList = [...res.data.list];
      });
    },
    //获取每一类详情数据
    getCategoryDetail(miniWallkey, type) {
      getCategoryDetail(miniWallkey, type).then((res) => {
        this.categoryDetailList = [...res];
      });
    },
    //监听scroll滚动位置
    contentscroll(position) {
      this.isShow = -position.y > this.tabOffsetTop;
    },
    //监听侧边栏的点击
    handleCategoryClick({ index, maitKey, miniWallkey }) {
      this.currentIndex = index;

      this.getSubcategory(maitKey);

      this.getCategoryDetail(miniWallkey, this.currentItemType);
    },
    //监听tabcontrol的点击
    itemclick(index) {
      switch (index) {
        case 0:
          this.currentItemType = "pop";
          break;
        case 1:
          this.currentItemType = "new";
          break;
        case 2:
          this.currentItemType = "sell";
      }
      this.getCategoryDetail(
        this.categoryList[this.currentIndex].miniWallkey,
        this.currentItemType
      );
      this.$refs.tabControll1.currentIndex = index;
      this.$refs.tabControll2.currentIndex = index;
    },
    //  图片加载完成  刷新scroll
    imgLoad() {
      this.$refs.scroll.refresh();
      //图片加载完毕   获取tabcontrol距离页面高度
      this.tabOffsetTop = this.$refs.tabControll2.$el.offsetTop;
    },
    activated() {
      this.$refs.scroll.refresh();
    },
  },
};
</script>
<style scoped>
.category {
  height: 100vh;
  position: relative;
}
.category-nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.category-side-bar {
  position: fixed;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 49px;
  width: 100px;
  /* height: calc(100% - 44px - 49px); */
  /* overflow: hidden; */
}
.category-content {
  position: relative;
}

.scroll_height {
  position: fixed;
  top: 44px;
  left: 100px;
  right: 0;
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
.showtabControl {
  position: absolute;
  left: 100px;
  width: 275px;
  z-index: 200;
}
</style>