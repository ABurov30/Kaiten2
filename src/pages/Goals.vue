<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useProjectsStore } from '../entities/store';
import Goal from '../shared/components/Goal.vue';

const store = useProjectsStore();
const { addGoal } = store;

const { getCurrentProjectGoals } = storeToRefs(store);
</script>

<template>
  <div v-if="getCurrentProjectGoals?.length" class="goalsContainer">
    <button class="addGoalButton" @click="addGoal">Add new goal</button>
    <Goal v-for="goal in getCurrentProjectGoals" :key="goal.id" :goal="goal" />
  </div>
  <div v-if="!getCurrentProjectGoals?.length" class="emptyGoalContainer">
    <span>There are no goals in project</span>
    <button class="addGoalButton" @click="addGoal">Add new goal</button>
  </div>
</template>

<style scoped>
.emptyGoalContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.goalsContainer {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 10px;
  gap: 10px;
}

.addGoalButton {
  width: 20%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: bold;
  opacity: 0.6;
}

.addGoalButton:hover {
  background-color: var(--primary-green);
}
</style>
