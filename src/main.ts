import { createApp } from 'vue';
import App from './App.vue';

import ElementPlus from 'element-plus';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import router from './router/router';
import { Colors } from './shared/constants/colors';
import { store } from './store';
import './style.css';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

const style = document.documentElement.style;
style.setProperty('--primary-green', Colors.primaryGreen);
style.setProperty('--primary-grey', Colors.primaryGrey);
style.setProperty('--primary-white', Colors.primaryWhite);

app.use(ElementPlus).use(store).use(router).mount('#app');
