<template>
  <div class="html-editor">
    <div class="envc-header">
      <span class="head-tabs">
        <span class="head-title">代码编辑</span>
        <a-tabs class="tabs-items" v-model:activeKey="codeLang" @change="handleLangChange">
          <a-tab-pane key="html" tab="html">html</a-tab-pane>
          <a-tab-pane key="css" tab="css">css</a-tab-pane>
          <a-tab-pane key="javascript" tab="javascript">javascript</a-tab-pane>
        </a-tabs>
      </span>      
      <a-select
        ref="select"
        v-model:value="codeTheme"
        style="width: 120px;"
        @change="handleThemeChange"
      >
        <a-select-option :value="item" v-for="item in themes" :key="item">{{ item }}</a-select-option>
      </a-select>
    </div>
    <div class="code-editor">
      <a-spin class="loading-spin" v-if="!isload" size="large" />
      <codemirror
        v-if="isload"
        class="code-emirror"
        v-model="code"
        :style="{ height: '100%', width: '100%' }"
        :extensions="extensions"
        @ready="handleReady"
        @change="handleCodeChange"
        @focus="log('focus', $event)"
        @blur="log('blur', $event)"
      />
    </div>
  </div> 
</template>
<script>
import { defineComponent, ref, shallowRef, computed } from 'vue'
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
      return {}
    },
    created() {
    },
    beforeUnmount() {
    },
    setup() {
      const code = ref('')
      const codeData = ref({
        html: '',
        css: '',
        javascript: ''
      })

      const initCode = function() {
        codeData.value.html = `<!DOCTYPE html>
<html>
<head>
  <style>
  </style>
</head>
<body>
    <p>这是直接书写HTML</p>
</body>
</html>`;
        codeData.value.css = `p {
  font-size: 14px;
}
        `;
        codeData.value.javascript = `function test() {
}
        `;
      }
      initCode();

      // Codemirror EditorView instance ref
      const handleReady = (payload) => {
        console.log('编辑器已准备好')
      }

      const isload = ref(true)
      const langOptions = [
        {name: 'javascript', value: javascript()},
        {name: 'html', value: html()},
        {name: 'css', value: css()},
      ]
      const codeLang = ref('html')
      const useCodeLand= ref(html())

      const setCurLang = function() {
        if (['html', 'css', 'javascript'].includes(codeLang.value)) {
          code.value = codeData.value[codeLang.value];
        }
      }
      setCurLang();
      const handleLangChange = function(value) {
        codeLang.value = value
        setCurLang();
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
          return findItem ? findItem.value : html();
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
        extensions,
        handleReady,
        log: console.log,
        codeLang,
        codeTheme,
        themeOptions,
        themes,
        handleLangChange,
        handleThemeChange,
        isload,
        codeData
      }
    },
    methods: {
      handleCodeChange() {
        if (this.code) {
          this.$emit('codeChange', this.codeData)
        }
      }
    }
  })
</script>

<style lang="less" scoped>
.html-editor {
  .envc-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    .head-tabs {
      display: inline-flex;
      align-items: center;
      .head-title {
        font-size: 16px;
        font-weight: bold;
      }
      .tabs-items {
        margin-left: 32px;
        :deep(.ant-tabs-nav) {
          margin: 0;
        }
        :deep(.ant-tabs-nav .ant-tabs-tab) {
          padding: 0;
        }
        :deep(.ant-tabs-content-holder),
        :deep(.ant-tabs-nav-operations) {
          display: none;
        }
      }
    }
  }
  .code-editor {
    height: calc(100% - 48px);
    position: relative;
    .loading-spin {
      position: absolute;
      left: 50%;
      top: 50%;
    }
    .code-emirror {
      :deep(.cm-editor) {
        outline: 1px dotted #212121;
      }
      :deep(.cm-editor.cm-focus) {
        outline: none;
      }
    }
  }
}
</style>