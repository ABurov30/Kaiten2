<script setup lang="ts">
import { MoonNight, Sunny } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useAppStore } from '../../entities/app/store';
import { Theme } from '../../entities/app/types';
import router from '../../router/router';

const store = useAppStore();
const { changeTheme } = store;

const { getTheme } = storeToRefs(store);
const isDarkTheme = ref(getTheme.value === Theme.dark);
</script>

<template>
  <div class="navbarContainer">
    <div class="navbar">
      <div class="logo"><button @click="router.push('/')">Kaiten</button></div>
      <div class="buttonsContainer">
        <button @click="router.push('/')">Projects</button>
        <button @click="router.push('/goals')">Goals</button>
        <el-switch
          class="themeSwitcher"
          v-model="isDarkTheme"
          @change="changeTheme"
          :active-action-icon="MoonNight"
          :inactive-action-icon="Sunny"
        />
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
button {
  background-color: transparent;
  border: none;
}
.themeSwitcher {
  margin: 0 10px;
}

.dark .buttonsContainer button {
  color: var(--primary-white);
}

.navbarContainer {
  width: 100vw;
  height: 100vh;
}

.navbar {
  display: flex;
  width: 100vw;
  height: 5vh;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 3px var(--primary-green), 3px 3px 15px var(--primary-green);
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
}

.logo button {
  text-transform: uppercase;
  font-weight: bold;
  color: var(--primary-green);
  font-size: large;
}

.buttonsContainer {
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.buttonsContainer button {
  width: 50%;
  height: 100%;
  background-color: transparent;
  border: none;
  text-transform: uppercase;
  color: #35495e;
}

.buttonsContainer button:hover {
  background-color: var(--primary-green);
}
</style>
