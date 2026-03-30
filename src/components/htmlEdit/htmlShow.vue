<template>
  <div class="show-content">
    <div class="envc-header">
      <span>运行结果</span>
      <span>
        <a-button @click="runCode">运行</a-button>
<!--         <a-button @click="resetRunLog" style="margin-left: 10px">重置</a-button> -->
      </span>
    </div>
    <div class="code-result-content">
      <div v-if="codeData" style="height: 100%"> 
        <iframe :srcdoc="codeConent"></iframe>
      </div>
      <div v-else>运行结果将显示在这里...</div>
    </div>
  </div>   
</template>
<script>
import { defineComponent } from 'vue'

  export default defineComponent({
    props: {
      codeData: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        codeConent: '',
        isloading: false
      }
    },
    created() {
    },
    beforeUnmount() {
    },
    setup() {
    },
    methods: {
      runCode() {
        this.codeConent = `<!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                }
            </style>
        </head>
        <body>
            <h1>这是直接嵌入的HTML</h1>
            <div class='content'>
                <p>这个内容是通过 <span class='highlight'>srcdoc</span> 属性直接嵌入到iframe中的HTML代码。</p>
                <button onclick='alert(&quot;来自iframe的问候!&quot;)'>点击测试</button>
            </div>
        </body>
        </html>`;
      },
      getResultHtmlConent() {
        return ''
      }
    }
  })
</script>

<style lang="less" scoped>
.show-content {
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
  .code-result-content {
    height: calc(100% - 48px);
    border: solid 1px rgb(167 159 159);
    background-color: #d8f2e8;
    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
}
</style>