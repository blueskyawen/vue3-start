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
        var combineCode = '';
        console.log(this.codeData.html)
        console.log(this.codeData.css)
        console.log(this.codeData.javascript)
        if (this.codeData && this.codeData.html) {
          combineCode = this.codeData.html
          if (this.codeData.css) {
            let preIndex = combineCode.indexOf('<style>');
            if (preIndex !== -1) {
              let preStr = combineCode.substr(0, preIndex + 7);
              let footStr = combineCode.substr(preIndex + 7);
              combineCode = preStr + this.codeData.css + footStr;
            } else {
              let headLoc = combineCode.indexOf('<head>');
              if (headLoc >= 0) {
                let preD = combineCode.substr(0, headLoc + 6);
                let fraD = combineCode.substr(headLoc + 6);
                combineCode = preD + `<style>${this.codeData.css}</style>` + fraD;
              }
            }
            if (this.codeData.javascript) {
              let preIndex = combineCode.indexOf('<script>');
              if (preIndex !== -1) {
                let preStr = combineCode.substr(0, preIndex + 8);
                let footStr = combineCode.substr(preIndex + 8);
                combineCode = preStr + this.codeData.javascript + footStr;
              } else {
                let headLoc = combineCode.indexOf('<body>');
                if (headLoc !== -1) {
                  let preD = combineCode.substr(0, headLoc + 6);
                  let fraD = combineCode.substr(headLoc + 6);
                  console.log(preD);
                  console.log(fraD);
                  combineCode = preD + `<script>${this.codeData.javascript}<\/script>` + fraD;      
                }
              }
            }
          }
        }
        console.log(combineCode);
        this.codeConent = combineCode;
        /*this.codeConent = `<!DOCTYPE html>
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
        </html>`;  */
      },
      getResultHtmlConent() {
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