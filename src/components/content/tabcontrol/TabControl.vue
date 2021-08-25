<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in tabcontroldata"
      class="tab-control-item"
      :key="index"
      :class="{ active: index === currentIndex }"
      @click="clickIndex(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    clickIndex(index) {
      this.currentIndex = index;
      //将子组件的数据发送给父组件 $emit 让父组件监听itemclick事件，并将index值传递过去
      this.$emit("itemclick", index);
    },
  },
  props: {
    tabcontroldata: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 44px;
  line-height: 44px;
  font-size: 15px;
  width: 100%;
  background-color: #fff;
}
.tab-control-item span {
  padding: 3px;
}
.tab-control-item {
  flex: 1;
}
.active {
  color: var(--color-hight-text);
}
.active span {
  border-bottom: 2px solid var(--color-hight-text);
}
</style>