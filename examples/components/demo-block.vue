<template>
  <div class="demo-block">
    <!-- 效果展示 -->
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="meta" ref="meta">
      <!-- 描述展示 -->
      <div class="description" v-if="$slots.default">
        <slot></slot>
      </div>
      <!-- 代码展示 -->
      <div class="highlight">
        <slot name="highlight"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isExpanded: false,
    }
  },
  computed: {
    codeArea() {
      return this.$el.getElementsByClassName('meta')[0];
    },
    codeAreaHeight() {
      if (this.$el.getElementsByClassName('description').length > 0) {
        return this.$el.getElementsByClassName('description')[0].clientHeight +
            this.$el.getElementsByClassName('highlight')[0].clientHeight + 20;
      }
      return this.$el.getElementsByClassName('highlight')[0].clientHeight;
    }
  },
  watch: {
    isExpanded(val) {
      this.codeArea.style.height = val ? `${ this.codeAreaHeight + 1 }px` : '0';
    }
  },
  mounted() {
    this.isExpanded = true;
  }
}
</script>
<style lang="scss">
// https://github.com/ElemeFE/element/blob/dev/examples/components/demo-block.vue
</style>
