<template>
<!--   <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    Vue’s
    <a href="https://vuejs.org/" target="_blank" rel="noopener"
      >official documentation</a
    >
    provides you with all information you need to get started.
  </WelcomeItem> -->
  <div class="code-envc">
    <div class="envc-header">运行</div>
    <div class="envc-content">
      <div class="code-editor">
        <codemirror
          v-model="code"
          :style="{ height: '400px', width: '50%' }"
          :extensions="extensions"
          mode="text/javascript"
          :disabled="disableCode"
          @ready="handleReady"
          @change="log('change', $event)"
          @focus="log('focus', $event)"
          @blur="log('blur', $event)"
        />
            </div>
      <div class="code-result"></div>
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

      return {
        code,
        disableCode,
        extensions,
        handleReady,
        log: console.log
      }
    }
  })
</script>