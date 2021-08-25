<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" @itemClick="itemClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentscroll"
      :probe-type="3"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @goodsImgLoad="goodsImgLoad"
      />
      <detail-param-info :param-info="paramInfo" ref="param" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommends" />
    </scroll>
    <back-top @click.native="backclick" v-show="isShowBackTop" />
    <detail-bottom-bar @addToCart="addToCart" />
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar.vue";

import Scroll from "@/components/common/scroll/Scroll.vue";
import BackTop from "@/components/content/backtop/BackTop.vue";

import { itemListenerMixin } from "@/common/mixin.js";
import { debouncd } from "@/common/utils.js";

import {
  getDetail,
  Goods,
  shop,
  GoodsParam,
  getRecommend,
} from "@/network/detail";

export default {
  name: "Detail",
  data() {
    return {
      id: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
  },

  created() {
    //给getThemeTopY赋值 存储offsetTop
    this.getThemeTopY = debouncd(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 500);
    //保存传入的id
    this.id = this.$route.params.id;
    // 请求id对应的detail详情数据
    getDetail(this.id).then((res) => {
      const data = res.result;
      //轮播图图片
      this.topImages.push(...data.itemInfo.topImages);
      // 商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //店铺信息
      this.shop = new shop(data.shopInfo);
      console.log(data);
      //商品详情
      this.detailInfo = data.detailInfo;
      //获取尺码表
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },
  mixins: [itemListenerMixin],
  methods: {
    goodsImgLoad() {
      //详情图片加载完成刷新scroll
      this.refresh();
      //详情图片加载完成获取各组件的offsetTop
      this.getThemeTopY();
    },
    itemClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    //监听滚动位置   根据滚动的Y值改变nav的index值
    contentscroll(position) {
      //backtop是否显示
      this.isShowBackTop = -position.y > 1000;
      // tabcontrol是否显示
      this.isShow = -position.y > this.tabOffsetTop;
      //当滚到themeTopYs[0]-themeTopYs[1]之间时，index=0
      //当滚到themeTopYs[1]-themeTopYs[2]之间时，index=1
      //当滚到themeTopYs[2]-themeTopYs[3]之间时，index=2
      //当滚到大于themeTopYs[3]之间时，index=3
      let positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          this.themeTopYs[i] <= positionY &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    //监听backtop
    backclick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    //监听加入购物车
    addToCart() {
      //获取购物测需要的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.detailInfo.desc;
      product.price = this.goods.realPrice;
      product.iid = this.id;

      //将商品添加到购物车
      this.$store.dispatch("addCart", product).then((res) => {
        this.$toast.show(res, 1500);
      });
    },
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 200;
  background-color: #fff;
  height: 100vh;
}
.detail-nav-bar {
  position: relative;
  background-color: #fff;
  z-index: 400;
}
.content {
  position: relative;
  z-index: 200px;
  height: calc(100% - 93px);
}
</style>
