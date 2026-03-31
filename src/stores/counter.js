import { ref, computed } from "vue";
import { defineStore } from "pinia";

const getLocalStoreValue = function(key, isFormat) {
  let temp = localStorage.getItem(key)
  return temp ? isFormat ? JSON.parse(temp) : temp : null;
}
const setLocalStoreValue = function(key, value, isFormat) {
  let temp = isFormat ? JSON.stringify(value) : value;
  localStorage.setItem(key, temp)
}

export const useStartStore = defineStore("start", () => {
  const jsRunState = ref(getLocalStoreValue('jsRunState', true) || {
    theme: 'oneDark',
    lang: 'javascript'
  });
  const htmlRunState = ref(getLocalStoreValue('htmlRunState', true) || {
    lang: 'html',
    theme: 'oneDark'
  });

  const jsCodeTheme = computed(() => jsRunState.value.theme);
  function setJsRunState(data) {
    jsRunState.value.theme = data.theme;
    jsRunState.value.lang = data.lang;
    setLocalStoreValue('jsRunState', data, true);
  }

  function setHtmlRunState(data) {
    htmlRunState.value.lang = data.lang;
    htmlRunState.value.theme = data.theme;
    setLocalStoreValue('htmlRunState', data, true);
  }

  return { jsRunState, htmlRunState, jsCodeTheme, setJsRunState, setHtmlRunState };
});
