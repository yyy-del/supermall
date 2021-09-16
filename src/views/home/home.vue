<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :tabcontroldata="['流行', '新款', '精选']"
      ref="tabControll1"
      @itemclick="itemclick"
      v-show="isShow"
      class="showtabControl"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentscroll"
      :pulling-up-load="true"
      @pullingUp="loadmore"
    >
      <home-swiper :banners="banners" @imgIsLoad="imgIsLoad" />
      <recommend-view :recommends="recommends" />
      <feature />
      <tab-control
        :tabcontroldata="['流行', '新款', '精选']"
        ref="tabControll2"
        @itemclick="itemclick"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backclick" v-show="isShowBackTop" />
  </div>
</template>
<script>
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";

import TabControl from "@/components/content/tabcontrol/TabControl.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";
import BackTop from "@/components/content/backtop/BackTop.vue";

import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView.vue";
import Feature from "./childComps/Feature.vue";

import { getHomeMultidata, getHomeGoodsData } from "@/network/home";

import { itemListenerMixin } from "@/common/mixin.js";

export default {
  name: "home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentItem: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isShow: false,
      saveY: 0,
    };
  },
  components: {
    NavBar,
    Scroll,
    TabControl,
    BackTop,

    HomeSwiper,
    RecommendView,
    Feature,
    GoodsList,
  },
  created() {
    //请求多个数据
    this.getHomeMultidata();
    //请求首页goods数据
    this.getHomeGoodsData("pop");
    this.getHomeGoodsData("new");
    this.getHomeGoodsData("sell");
  },
  mixins: [itemListenerMixin],
  mounted() {
    if (location.href.indexOf("#reloaded") == -1) {
      location.href = location.href + "#reloaded";
      location.reload();
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentItem].list;
    },
  },
  //进入首页
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  //离开首页
  deactivated() {
    //保存y值
    this.saveY = this.$refs.scroll.getScrollY();
    // 取消全局事件监听，防止在详情页触发
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    itemclick(index) {
      switch (index) {
        case 0:
          this.currentItem = "pop";
          break;
        case 1:
          this.currentItem = "new";
          break;
        case 2:
          this.currentItem = "sell";
      }
      this.$refs.tabControll1.currentIndex = index;
      this.$refs.tabControll2.currentIndex = index;
    },

    //监听backtop
    backclick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    //监听滚动位置
    contentscroll(position) {
      //backtop是否显示
      this.isShowBackTop = -position.y > 1000;
      // tabcontrol是否显示
      this.isShow = -position.y > this.tabOffsetTop;
    },
    //监听上拉加载
    loadmore() {
      this.getHomeGoodsData(this.currentItem);
    },
    //监听轮播图图片加载完成$el表示获取组件根元素
    imgIsLoad() {
      this.tabOffsetTop = this.$refs.tabControll2.$el.offsetTop;
    },

    /* 数据请求*/
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoodsData(type) {
      const page = this.goods[type].page + 1;
      getHomeGoodsData(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //完成上拉加载更多，以便下一次加载
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>
<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  position: absolute;
  top: 43px;
  left: 0;
  right: 0;
  overflow: hidden;
  height: calc(100% - 93px);
}
.showtabControl {
  position: absolute;
  top: 41px;
  z-index: 10;
}
</style>