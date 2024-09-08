<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from './entities/app/store';
import Loader from './shared/components/Loader.vue';
import Navbar from './shared/components/Navbar.vue';
import Sidebar from './shared/components/Sidebar.vue';

const store = useAppStore();

const { getTheme } = storeToRefs(store);
</script>

<template>
  <Suspense>
    <div :class="[getTheme]">
      <Navbar>
        <Sidebar>
          <div class="app">
            <router-view></router-view>
          </div>
        </Sidebar>
      </Navbar>
    </div>

    <template #fallback>
      <div :class="[getTheme]">
        <Loader /></div
    ></template>
  </Suspense>
</template>

<style scoped>
.app {
  width: 100%;
  height: 100%;
}
</style>
