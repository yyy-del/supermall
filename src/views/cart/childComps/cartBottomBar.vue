<template>
  <div class="cart-bottom-bar">
    <div class="check-all">
      <check-button
        class="check-btn"
        :is-checked="isCheckedAll"
        @click.native="selecterAllBtn"
      />
      <span class="check-text">全选</span>
    </div>
    <div class="total-price">
      <span>总计:{{ totalPrice }}</span>
    </div>
    <div class="caculate" @click="settlement">
      <span>去计算:({{ chencedLength }})</span>
    </div>
  </div>
</template>
<script>
import CheckButton from "@/components/content/checkbutton/CheckButton.vue";

export default {
  name: "cartBottomBar",
  components: { CheckButton },
  methods: {
    selecterAllBtn() {
      //判断是否全选
      if (this.isCheckedAll) {
        //状态为全选
        this.$store.state.cartList.forEach((item) => {
          item.checked = false;
        });
      } else {
        //状态为不全选
        this.$store.state.cartList.forEach((item) => {
          item.checked = true;
        });
      }
    },
    settlement() {
      if (this.$store.state.cartList.length === 0) {
        this.$toast.show("请选择结算商品", 1500);
      }
    },
  },
  computed: {
    //计算选中商品的总价
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((pervalue, item) => {
            return pervalue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    //计算结算个数
    chencedLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    //商品是否全部被选中
    isCheckedAll() {
      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.state.cartList.find((item) => !item.checked);
    },
  },
};
</script>
<style scoped>
.cart-bottom-bar {
  position: relative;
  display: flex;
  text-align: center;

  align-items: center;
  height: 40px;
  background-color: #eee;
}
.check-all {
  display: flex;
  margin-left: 10px;
  align-items: center;
  width: 60px;
}
.check-btn {
  width: 20px;
  height: 20px;
}
.check-text {
  margin-left: 6px;
  line-height: 40px;
}
.total-price {
  flex: 1;
}
.caculate {
  background-color: rgb(255, 0, 0);
  color: #fff;
  width: 100px;

  line-height: 40px;
}
</style>
