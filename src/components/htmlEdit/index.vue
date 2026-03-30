<template>
  <div class="code-envc">
    <htmlEditor class="editor-content" @codeChange="handleCode" />
    <htmlShow class="result-content" :codeData="code"></htmlShow>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import htmlEditor from "./htmlEditor.vue";
import htmlShow from "./htmlShow.vue";

  export default defineComponent({
    components: {
      htmlEditor,
      htmlShow
    },
    data() {
      return {
        code: {}
      }
    },
    created() {
    },
    beforeUnmount() {
    },
    methods: {
      handleCode(data) {
        this.code = data || {};
      }
    }
  })
</script>

<style lang="less" scoped>
.code-envc {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  height: 100%;
  .editor-content,
  .result-content {
    width: calc(50% - 10px);
  }
}
</style>