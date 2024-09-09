<script setup lang="ts">
// @ts-nocheck
import { Delete, Edit, Select } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { useProjectsStore } from '../../entities/store';
import { Column } from '../../entities/types';
import { Colors } from '../constants/colors';
import { useOnCurProjectChange } from '../hooks/useOnCurProjectChange';
import TicketCard from './Ticket.vue';

const { column } = defineProps<{ column: Column }>();
const isEditProcess = ref(false);
const isHovered = ref(false);

const store = useProjectsStore();
const { renameColumn, deleteColumn, addTicket, moveTicket, reorderColumn } = store;

const input = ref('');

const startEditing = () => {
  input.value = column.name; //
  isEditProcess.value = true;
};

const renameColumnHandler = (columnId: string) => {
  renameColumn(columnId, input.value);
  isEditProcess.value = false;
};

useOnCurProjectChange(() => {
  isEditProcess.value = false;
  input.value = '';
});

const onDrop = (e: DragEvent, column: Column) => {
  if (e.dataTransfer?.getData('ticket')) {
    const ticket = JSON.parse(e.dataTransfer?.getData('ticket'));
    const { prevColumn } = ticket;
    delete ticket.prevColumn;
    moveTicket(ticket, prevColumn, column.id);
  }

  if (e.dataTransfer?.getData('column')) {
    const dragColumn = JSON.parse(e.dataTransfer?.getData('column'));

    reorderColumn(dragColumn, column);
  }
};

const onDragStart = (e: DragEvent, column: Column) => {
  e.dataTransfer.dropEffect = 'move';
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer?.setData('column', JSON.stringify(column));
};
</script>

<template>
  <div class="column" @drop="onDrop($event, column)" @dragover.prevent @dragenter.prevent>
    <div
      class="columnHeader"
      @mouseleave="isHovered = false"
      @mouseover="isHovered = true"
      @dragstart="onDragStart($event, column)"
      draggable="true"
    >
      <span v-if="!isEditProcess">{{ column.name }}</span>
      <el-input v-if="isEditProcess" v-model="input" autosize :placeholder="column?.name" autofocus />
      <div class="buttonsContainer">
        <button v-if="!isEditProcess && isHovered" @click="startEditing">
          <el-icon size="20" :color="Colors.primaryWhite">
            <Edit />
          </el-icon>
        </button>
        <button v-if="!isEditProcess && isHovered" @click="deleteColumn(column.id)">
          <el-icon size="20" :color="Colors.primaryWhite">
            <Delete />
          </el-icon>
        </button>
        <button v-if="isEditProcess" @click="renameColumnHandler(column.id)">
          <el-icon size="20" :color="Colors.primaryWhite">
            <Select />
          </el-icon>
        </button>
      </div>
    </div>
    <button class="addTicketButton" @click="addTicket(column.id)">Add new ticket</button>
    <div class="ticketCardContainer">
      <TicketCard v-for="ticket in column.tickets" :key="ticket.id" :ticket="ticket" :columnId="column.id" />
    </div>
  </div>
</template>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  width: max-content;
  min-width: 20%;
  gap: 20px;
}

.buttonsContainer {
  display: flex;
  gap: 5px;
}

.columnHeader {
  padding: 10px;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  align-items: center;
  background-color: var(--primary-green);
  color: var(--primary-white);
}

.columnHeader button {
  background-color: transparent;
  border: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ticketCardContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
}

.addTicketButton {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: bold;
  opacity: 0.6;
}

.addTicketButton:hover {
  background-color: var(--primary-green);
}
</style>
