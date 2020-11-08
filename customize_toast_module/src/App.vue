<template>
  <div>
    <h1>使用 Vue.extend 動態創建組件</h1>
    <button @click="showToast">打開彈窗</button>
  </div>
</template>

<script>
export default {
  methods: {
    showToast() {
      this.$toast("彈窗內容");
    },
  },
};
</script>