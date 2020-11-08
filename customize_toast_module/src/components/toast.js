import Vue from 'vue'
import Toast from "./Toast.vue";

// ToastConstructor 實際上是 Toast 元件的構造函數，類似於 Vue 的構造函數，所以可以使用 new 實例化，來創造 Toast 元件。 
const ToastConstructor = Vue.extend(Toast);

function showToast(text, duration = 2000) {
    //  toastDOM 是 toast元件實體，它上面有很多實體屬性
    const toastDOM = new ToastConstructor({
        el: document.createElement('div'), //
        data() {
            return {
                text: text,
                show: true
            }
        }
    })
    document.body.appendChild(toastDOM.$el)
    setTimeout(() => {
        toastDOM.show = false
    }, duration)
}

function toastRegister() {
    Vue.prototype.$toast = showToast
}

export default toastRegister;