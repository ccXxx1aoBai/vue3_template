import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus';
import './assets/style/element/index.scss';
import zhCN from 'element-plus/es/locale/lang/zh-cn';
import * as Icons from '@element-plus/icons-vue';
import Router from './router';
import Store from './store';

const app = createApp(App)

for (const [key, component] of Object.entries(Icons)) {
	app.component(key, component);
}

app.use(ElementPlus, { locale: zhCN }).use(Store).use(Router).mount('#app')
