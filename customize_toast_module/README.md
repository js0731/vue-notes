### 前言

有的時候我需要動態的去創建元件，比如說當我按了某個按鈕後，才會去創建 toast 元件，而這樣的功能就要使用到 `Vue.extend(options)`，使用`Vue.extend(options)`會得到一個 VueComponent 子類別，在實體化 Component 時會用到 Extend。

### 為什麼會有 Vue.extend ?

1. 這個函數的作用，是用來實體化出來一個實體， 這個用來實體化的實體也是一個組件， 稱之為**根實體**。

2. 出於需求，我們需要拓展一些方法，又不想寫在根實體中，所以Vue.js就給出了一個解決方案，這個方法叫做extend。

3. Vue 和 Vue.extend 的輸出結果及其相似，但是這兩個東西的使用方法並不一樣，Vue可以new實例化，但是Vue.extend不可以。

4. Vue.extend 是通過 Vue 的原型繼承，所以所有的配置項都能寫。


### Vue.extend 和 Vue.component 的區別

-   `Vue.component`需要進行組件註冊才能使用，在模板中使用註冊的標籤名來使用，`Vue.extend`是編程式寫法

-    `Vue.component`使用起來簡單，`Vue.extend`常用來封裝一些集成組件。


### 編輯 APP 元件

```
<template>
	<div>
		<h1>使用 Vue.extend 動態創建組件</h1>
		<button @click="showToast"> 打開彈窗 </button>
	</div>
</template>

<script>
	export default {
		methods:{
			showToast(){
				// this.$toast('彈窗內容')	
			}
		},	
	}
</script>
```

### 新增toast元件

YourProject / src / component / `touch Toast.vue`

```
YourProject / src / component / Toast.vue

<template>
    <div class="container" v-if="show">{{ text }}</div>
</template>

<script>
export default {
    name: "Toast",
};
</script>>

<style scoped>
.container {
    position: fixed;
    top: calc(50% - 20px);
    left: calc(50% - 50px);
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
}
</style>
```



### 新增toast.js檔

YourProject / src / component / `touch toast.js`



```
YourProject / src / component / toast.js

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
```
### main.js 導入toast 元件

```
// main.js

import  Vue  from  'vue'
import  App  from  './App.vue'
<------------------------------------------------------------------------------------>
import toastRegister from './components/toast.js'

Vue.use(toastRegister );
<------------------------------------------------------------------------------------>
Vue.config.productionTip = false

  
new  Vue({
	render:  function (h) { return  h(App) },
}).$mount('#app')
```

### 編輯 APP 元件
打開方法
```
<template>
	<div>
		<h1>使用 Vue.extend 動態創建組件</h1>
		<button @click="showToast"> 打開彈窗 </button>
	</div>
</template>

<script>
	export default {
		methods:{
			showToast(){
<------------------------------------------------------------------------------------>
				 this.$toast('彈窗內容')	
<------------------------------------------------------------------------------------>
			}
		},	
	}
</script>
```