<template>
  <div class="code-envc">
    <div class="envc-content">
      <div class="envc-header">
        <span>代码编辑</span>
        <div>
<!--           <a-select
          ref="select"
          v-model:value="codeLang"
          style="width: 120px"
          @change="handleLangChange"
        >
          <a-select-option :value="item" v-for="item in langs" :key="item">{{ item }}</a-select-option>
          </a-select> -->
          <a-select
            ref="select"
            v-model:value="codeTheme"
            style="width: 120px;margin-left: 10px;"
            @change="handleThemeChange"
          >
            <a-select-option :value="item" v-for="item in themes" :key="item">{{ item }}</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="code-editor">
        <a-spin class="loading-spin" v-if="!isload" size="large" />
        <codemirror
          v-if="isload"
          class="code-emirror"
          v-model="code"
          :style="{ height: '100%', width: '100%' }"
          :extensions="extensions"
          :disabled="disableCode"
          @ready="handleReady"
          @change="log('change', $event)"
          @focus="log('focus', $event)"
          @blur="log('blur', $event)"
        />
      </div>
    </div>
    <div class="code-result">
      <div class="envc-header">
        <span>运行结果</span>
        <span>
          <a-button @click="runCode">运行</a-button>
          <a-button @click="resetRunLog" style="margin-left: 10px">重置</a-button>
        </span>
      </div>
      <div class="code-result-content">
        <div v-if="resultLogs.length"> 
          <span style="display: block;" v-for="(log, index) in resultLogs" :key="index">{{ log }}</span>
        </div>
        <div v-else>运行结果将显示在这里...</div>
      </div>
    </div>   
  </div>
</template>
<script>
import { defineComponent, ref, shallowRef, nextTick, computed } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { ayuLight, clouds, cobalt, coolGlow } from 'thememirror'
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView, lineNumbers } from "@codemirror/view";

let myTheme = EditorView.theme({
  "&": { color: "#0052D9", backgroundColor: "#FFFFFF" },
  ".cm-content": { caretColor: "#0052D9" },
  ".cm-activeLine": { backgroundColor: "#FAFAFA" },
  ".cm-activeLineGutter": { backgroundColor: "#FAFAFA" },
  "&.cm-focused .cm-cursor": { borderLeftColor: "#0052D9" },
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "#0052D9",
    color: "#FFFFFF"
  },
  ".cm-gutters": { backgroundColor: "#FFFFFF", color: "#000", border: "none" }
}, { dark: true });

  export default defineComponent({
    components: {
      Codemirror
    },
    data() {
      return {
        resultLogs: [],
        iframe1: null
      }
    },
    created() {
      this.resultLogs = []
      this.initOriginalLog()
      let that = this
      console.log = function(message) { // 重写console.log方法
        that.resultLogs.push(`>>> ${message}`); // 将日志添加到输出区域
      }
    },
    beforeUnmount() {
      this.resultLogs = [];
    },
    setup() {
      const code = ref('')
      const disableCode = ref(true)

      // Codemirror EditorView instance ref
      const view = shallowRef()
      const handleReady = (payload) => {
        view.value = payload.view
        console.log('编辑器已准备好')
      }

      // Status is available at all times via Codemirror EditorView
      const getCodemirrorStates = () => {
        const state = view.value.state
        const ranges = state.selection.ranges
        const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
        const cursor = ranges[0].anchor
        const length = state.doc.length
        const lines = state.doc.lines
        // more state info ...
        // return ...
      }

      disableCode.value = false
      const isload = ref(true)

      const langOptions = [
        {name: 'javascript', value: javascript()},
        {name: 'html', value: html()},
        {name: 'css', value: css()},
      ]
      const langs = langOptions.map((item) => item.name)
      const codeLang = ref('javascript')
      const useCodeLand= ref(javascript())
      const handleLangChange = function(value) {
        codeLang.value = value
        isload.value = false
        initEditorSet(true)
      }

      const themeOptions = [
        {name: 'oneDark', value: oneDark},
        {name: 'light', value: myTheme},
        {name: 'ayuLight', value: ayuLight},
        {name: 'coolGlow', value: coolGlow},
        {name: 'cobalt', value: cobalt},
        {name: 'clouds', value: clouds},
      ]
      const themes = themeOptions.map((item) => item.name)
      const codeTheme = ref('oneDark')
      const useCodeTheme = ref(oneDark)

      const handleThemeChange = function(value) {
        codeTheme.value = value
        initEditorSet()
      }

      const getSelectOption = function(type, name) {
        if (type === 'theme') {
          let findItem = themeOptions.find(x => x.name === name)
          return findItem ? findItem.value : myTheme;
        } else {
          let findItem = langOptions.find(x => x.name === name)
          return findItem ? findItem.value : javascript();
        }
      }
      const initEditorSet = function(reload) {
        useCodeTheme.value = getSelectOption('theme', codeTheme.value);
        useCodeLand.value = getSelectOption('lang', codeLang.value);
        if (reload) {
          setTimeout(() => {
            isload.value = true
          }, 300)
        }
      }
      initEditorSet();

      let extensions = computed(() => {
        return [useCodeTheme.value, useCodeLand.value, lineNumbers()];
      })

      return {
        code,
        disableCode,
        extensions,
        handleReady,
        log: console.log,
        codeLang,
        langOptions,
        codeTheme,
        themeOptions,
        langs,
        themes,
        handleLangChange,
        handleThemeChange,
        isload
      }
    },
    methods: {
      runCode() {
        try {
            const result = eval(this.code); // 使用eval执行代码，注意：eval有安全风险，仅用于示例！
        } catch (error) {
          this.resultLogs.push(`Error: ${error}`)
        } finally {
        }
      },
      initOriginalLog() {
        this.iframe1 = document.createElement('iframe');
        this.iframe1.style.display = 'none';
        document.body.appendChild(this.iframe1);
        window.addEventListener('beforeunload', this.resetConsoleLog);
      },
      resetConsoleLog(event) {
        if (this.iframe1) {
          const originalLog = this.iframe1.contentWindow.console;
          console.log = originalLog.log;
          console.log('console.log已恢复!!!')
          window.removeEventListener('beforeunload', this.resetConsoleLog);
          document.body.removeChild(this.iframe1);
          this.iframe1 = null 
        }
      },
      resetRunLog() {
        this.resultLogs = []
      }
    }
  })
</script>

<style lang="less" scoped>
.code-emirror :deep(.cm-editor) {
  outline: 1px dotted #212121;
}
.code-emirror :deep(.cm-editor.cm-focus) {
  outline: none;
}
.code-envc {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  height: 100%;
  .envc-content,
  .code-result {
    width: calc(50% - 10px);
  }
  .envc-header {
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 8px 0;
    > span {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
.envc-content .code-editor {
  height: calc(100% - 48px);
  position: relative;
  .loading-spin {
    position: absolute;
    left: 50%;
    top: 50%;
  }
}
.code-result .code-result-content {
  height: calc(100% - 48px);
  border: solid 1px rgb(167 159 159);
  background-color: #d8f2e8;
}
</style>