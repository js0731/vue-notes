<template>
  <div class="container" v-if="show">{{ text }}</div>
</template>

<script>
export default {
  name: "Toast",
};
</script>>

<style  scoped>
.container {
  position: fixed;
  top: calc(50% - 20px);
  left: calc(50% - 50px);
  width: 100px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
}
</style>