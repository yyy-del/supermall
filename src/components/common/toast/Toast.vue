<template>
  <div class="toast" v-show="isShow">
    <div>{{ messages }}</div>
  </div>
</template>
<script>
export default {
  name: "Toast",
  data() {
    return {
      messages: "",
      isShow: false,
    };
  },
  methods: {
    show(messages, duraction = 1000) {
      this.messages = messages;
      this.isShow = true;
      setTimeout(() => {
        this.messages = "";
        this.isShow = false;
      }, duraction);
    },
  },
};
</script>
<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);
  font-size: 20px;
  border-radius: 10px;
  z-index: 999;
}
</style>