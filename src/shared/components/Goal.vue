<script setup lang="ts">
import { ref } from 'vue';
import { useProjectsStore } from '../../entities/store';
import { Goal } from '../../entities/types';
import { Colors } from '../constants/colors';

defineProps<{ goal: Goal }>();
const input = ref('');
const isEditProcess = ref(false);
const isHovered = ref(false);

const store = useProjectsStore();
const { deleteGoal, renameGoal } = store;

const renameGoalHandler = (columnId: string) => {
  renameGoal(columnId, input.value);
  isEditProcess.value = false;
};
</script>

<template>
  <div class="goalListItem" @mouseleave="isHovered = false" @mouseover="isHovered = true">
    <span v-if="!isEditProcess">{{ goal.name }}</span>

    <el-input v-if="isEditProcess" v-model="input" autosize :placeholder="goal?.name" autofocus />
    <div class="buttonsContainer">
      <button v-if="!isEditProcess && isHovered" @click="isEditProcess = true">
        <el-icon size="20" :color="Colors.primaryGreen">
          <Edit />
        </el-icon>
      </button>
      <button v-if="!isEditProcess && isHovered" @click="deleteGoal(goal.id)">
        <el-icon size="20" :color="Colors.primaryGreen">
          <Delete />
        </el-icon>
      </button>
      <button v-if="isEditProcess" @click="renameGoalHandler(goal.id)">
        <el-icon size="20" :color="Colors.primaryGreen">
          <Select />
        </el-icon>
      </button>
    </div>
  </div>
</template>

<style scoped>
.buttonsContainer {
  display: flex;
  gap: 5px;
}
.goalListItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 95%;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 1px 1px 3px var(--primary-green), 3px 3px 15px var(--primary-green);
}

.goalListItem button {
  background-color: transparent;
  border: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.goalListItem:hover {
  background-color: var(--primary-grey);
  color: var(--primary-white);
}
</style>
