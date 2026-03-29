<template>
  <div class="code-envc">
    <div class="envc-content">
      <div class="envc-header">
        <span>代码编辑</span>
        <div>
          <a-select
          ref="select"
          v-model:value="codeLang"
          style="width: 120px"
          @change="handleLangChange"
        >
          <a-select-option :value="item.value" v-for="item in langOptions" :key="item.name">{{ item.name }}</a-select-option>
          </a-select>
          <a-select
            ref="select"
            v-model:value="codeTheme"
            style="width: 120px;margin-left: 10px;"
            @change="handleThemeChange"
          >
            <a-select-option :value="item.value" v-for="item in themeOptions" :key="item.name">{{ item.name }}</a-select-option>
          </a-select>
        </div>
      </div>
      <div class="code-editor">
        <codemirror
          v-model="code"
          :style="{ height: '100%', width: '100%' }"
          :extensions="extensions"
          mode="text/javascript"
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
        <a-button>运行</a-button>
      </div>
      <div class="code-result-content">
        运行结果展示
      </div>
    </div>   
  </div>
</template>
<script>
import { defineComponent, ref, shallowRef } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from "@codemirror/lang-javascript";
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
    setup() {
      const code = ref('')
      const disableCode = ref(true)
      const extensions = [javascript(), lineNumbers(), oneDark];

      // Codemirror EditorView instance ref
      const view = shallowRef()
      const handleReady = (payload) => {
        view.value = payload.view
        console.log('编辑器已准备好', view.value)
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

      const langOptions = [
        {name: 'javascript', value: javascript()},
        {name: 'html', value: javascript()},
        {name: 'css', value: javascript()},
      ]
      const codeLang = ref(javascript())
      const themeOptions = [
        {name: 'oneDark', value: oneDark},
        {name: 'ayuLight', value: oneDark},
        {name: 'smoothy', value: oneDark},
        {name: 'nord', value: oneDark},
        {name: 'materialDark', value: oneDark},
        {name: 'dracula', value: oneDark},
        {name: 'coolGlow', value: oneDark},
        {name: 'cobalt', value: oneDark},
        {name: 'clouds', value: oneDark},
      ]
      const codeTheme = ref(oneDark)
      const handleLangChange = function(value) {
        codeLang.value = value
      }
      const handleThemeChange = function(value) {
        codeTheme.value = value
      }

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
        handleLangChange,
        handleThemeChange
      }
    },
    methods: {
    }
  })
</script>

<style scoped>
.code-envc {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  height: 100%;
}
.code-envc .envc-content,
.code-envc .code-result {
  width: calc(50% - 10px);
}
.code-envc .envc-header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 8px 0;
}
.code-envc .envc-header > span {
  font-size: 16px;
  font-weight: bold;
}
.envc-content .code-editor {
  height: calc(100% - 48px);
}
.code-result .code-result-content {
  height: calc(100% - 48px);
  border: solid 1px rgb(167 159 159);
  background-color: #d8f2e8;
}
</style>