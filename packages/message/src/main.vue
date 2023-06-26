<template>
  <transition name="el-message-fade">
    <div class="el-message" v-if="visible"
         @mouseenter="clearTimer"
         @mouseleave="startTimer"
         :style="positionStyle">
      <div class="el-message__content">
        <p class="el-message__text" v-text="message" />
      </div>
      <div class="el-message__close-btn"  v-if="showClose" @click="close">X</div>
    </div>
  </transition>
</template>

<script>
module.exports = {
  name: 'ElMessage',
  data() {
    return {
      closed: false,
      timer: null,
      showClose: false,
      offset: 20, // 默认偏移量
      message: '',
      visible: false, // 控制组件显示与隐藏的标识
      duration: 3000, // 默认的隐藏时间
      onClose: null, // 关闭时的回调函数
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
      }
    }
  },
  computed: {
    positionStyle() {
      return {
        'top': `${this.offset}px`
      };
    }
  },
  mounted() {
    // 组件激活开启一个定时器
    this.startTimer();
  },
  methods: {
    close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose(this);
      }
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration);
      }
    }
  }
};
</script>
