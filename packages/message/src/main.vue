<template>
  <div class="el-message" :style="positionStyle">
    <div class="el-message__content">
      <p class="el-message__text">测试测试测试</p>
    </div>
    <div class="el-message__close-btn">X</div>
  </div>
</template>

<script>
module.exports ={
  name: 'ElMessage',
  data() {
    return {
      offset: 20 // 默认偏移量
    }
  },
  computed: {
    positionStyle() {
      return {
        'top': `${ this.offset }px`
      };
    }
  },
};
</script>
