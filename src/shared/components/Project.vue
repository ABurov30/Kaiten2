<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useProjectsStore } from '../../entities/store';
import { Project } from '../../entities/types';
import { Colors } from '../constants/colors';
const store = useProjectsStore();
const { setCurrentProject, deleteProject } = store;
const { getCurrentProject } = storeToRefs(store);
defineProps<{ project: Project }>();
const isHovered = ref(false);
</script>

<template>
  <div
    class="projectListItem"
    :class="{ active: getCurrentProject?.id === project.id }"
    @click="setCurrentProject(project.id)"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="avatar">
      <span>{{ project.name[0] }}</span>
    </div>
    <div>{{ project.name }}</div>
    <button v-if="isHovered" @click="deleteProject(project.id)">
      <el-icon size="20" :color="Colors.primaryGreen">
        <Delete />
      </el-icon>
    </button>
  </div>
</template>

<style scoped>
.projectListItem {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 90%;
  min-width: max-content;
  padding: 10px;
  border-radius: 4px;
}

.projectListItem button {
  border: none;
  background-color: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.active {
  background-color: var(--primary-green);
  color: var(--primary-white);
}

.active .avatar {
  background-color: var(--primary-grey);
}

.active:hover .avatar {
  background-color: var(--primary-green);
}

.avatar {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-green);
}

.projectListItem:hover {
  background-color: var(--primary-grey);
  color: var(--primary-white);
}

.dark .projectListItem:hover {
  background-color: var(--primary-white);
  color: var(--primary-grey);
}
</style>
