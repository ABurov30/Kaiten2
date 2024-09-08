<script setup>
import { Plus } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { useProjectsStore } from '../../entities/store';
import { Colors } from '../constants/colors';
import Project from './Project.vue';
import { ref } from 'vue';
import { getWeather } from '../utils/getWeather';
import Weather from './Weather.vue';

const store = useProjectsStore();
const { addProject } = store;
const { projects } = storeToRefs(store);


</script>

<template>
  <div class="sidebarContainer">
    <div class="sidebar">
      <div class="sidebarTitle">
        <span>My projects</span>
        <button class="addProjectButton" @click="addProject">
          <el-icon size="20" :color="Colors.primaryGreen">
            <Plus />
          </el-icon>
        </button>
      </div>
      <Project v-for="project in projects" :key="project.id" :project="project" />
      <Weather/>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
.sidebarTitle {
  text-transform: uppercase;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sidebar {
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  box-shadow: 1px 1px 3px var(--primary-green), 3px 3px 15px var(--primary-green);
}

.sidebarContainer {
  width: 100vw;
  height: 95vh;
  display: flex;
  gap: 20px;
}
.addProjectButton {
  border: none;
  padding: 0;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
