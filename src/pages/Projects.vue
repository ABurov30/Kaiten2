<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import { Edit, Select } from '@element-plus/icons-vue';
import { useProjectsStore } from '../entities/store';
import Column from '../shared/components/Column.vue';
import { Colors } from '../shared/constants/colors';
import { useOnCurProjectChange } from '../shared/hooks/useOnCurProjectChange';

const store = useProjectsStore();
const { renameProject, addColumn } = store;
const { getCurrentProject } = storeToRefs(store);
const isEditProcess = ref(false);
const input = ref('');

const startEditing = () => {
  input.value = getCurrentProject?.value?.name; //
  isEditProcess.value = true;
};

const renameProjectHandler = () => {
  if (!getCurrentProject?.value?.id) return;
  renameProject(getCurrentProject?.value?.id, input.value);
  isEditProcess.value = false;
};
useOnCurProjectChange(() => {
  isEditProcess.value = false;
  input.value = '';
});
</script>

<template>
  <div class="projectContainer" v-if="getCurrentProject?.id">
    <div class="projectTitleContainer">
      <span v-if="!isEditProcess">{{ getCurrentProject?.name }}</span>
      <el-input v-if="isEditProcess" autosize :placeholder="getCurrentProject?.name" autofocus v-model="input" />
      <button v-if="!isEditProcess" @click="startEditing">
        <el-icon size="20" :color="Colors.primaryGreen">
          <Edit />
        </el-icon>
      </button>
      <button v-if="isEditProcess" @click="renameProjectHandler">
        <el-icon size="20" :color="Colors.primaryGreen">
          <Select />
        </el-icon>
      </button>
    </div>
    <div class="columnContainer">
      <Column v-for="column in getCurrentProject?.columns" :key="column.id" :column="column" />
      <button class="addColumnButton" @click="addColumn">Add new column</button>
    </div>
  </div>
  <div v-if="!getCurrentProject?.id" class="emptyCurrentProjectContainer">
    <span>There is no chosen project</span>
  </div>
</template>

<style scoped>
.emptyCurrentProjectContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.projectTitleContainer {
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  gap: 5px;
  align-items: center;
}

.projectTitleContainer button {
  border: none;
  background-color: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.addColumnButton {
  width: 20%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: bold;
  opacity: 0.6;
  align-self: start;
}

.addColumnButton:hover {
  background-color: var(--primary-green);
}

.projectContainer {
  padding: 10px;
  margin: 10px;
}
.columnContainer {
  width: 100%;
  height: 90%;
  display: flex;
  align-items: baseline;
  gap: 20px;
}
</style>
