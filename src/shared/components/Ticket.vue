<script setup lang="ts">
import { ref } from 'vue';
import { useProjectsStore } from '../../entities/store';
import { Ticket } from '../../entities/types';
import { Colors } from '../constants/colors';
import { useOnCurProjectChange } from '../hooks/useOnCurProjectChange';

const { ticket, columnId } = defineProps<{ ticket: Ticket; columnId: string }>();
const isHovered = ref(false);
const store = useProjectsStore();
const { deleteTicket, editTicket, reorderTicket } = store;

const isEditProcess = ref(false);
const form = ref<Ticket>({ name: ticket.name, description: ticket.description, id: ticket.id });
const isDialogOpen = ref(false);

const startEditing = () => {
  isEditProcess.value = true;
  isDialogOpen.value = true;
};

const stopEditing = () => {
  isEditProcess.value = false;
  isDialogOpen.value = false;
};

const editTicketHandler = () => {
  editTicket(columnId, form.value);
  stopEditing();
};

useOnCurProjectChange(() => (isEditProcess.value = false));

const onDragStart = (e: DragEvent, ticket: Ticket) => {
  e.dataTransfer.dropEffect = 'move';
  e.dataTransfer.effectAllowed = 'move';
  const ticketWithPrevColumn = { ...ticket, prevColumn: columnId };
  e.dataTransfer?.setData('ticket', JSON.stringify(ticketWithPrevColumn));
};

const onDrop = (e: DragEvent, ticket: Ticket) => {
  if (e.dataTransfer?.getData('ticket')) {
    const dragTicket = JSON.parse(e.dataTransfer?.getData('ticket'));
    if (dragTicket.prevColumn === columnId) {
      delete ticket.prevColumn;
      reorderTicket(dragTicket, ticket, columnId);
    }
  }
};
</script>

<template>
  <div
    class="card"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    @drop="onDrop($event, ticket)"
    draggable="true"
    @dragstart="onDragStart($event, ticket)"
    @dragover.prevent
    @dragenter.prevent
  >
    <div class="titleContainer">
      <span class="title">{{ ticket.name }}</span>
      <div v-if="!isEditProcess && isHovered" class="buttonsContainer">
        <button v-if="!isEditProcess && isHovered" @click="startEditing">
          <el-icon size="20" :color="Colors.primaryGreen">
            <Edit />
          </el-icon>
        </button>
        <button @click="deleteTicket(columnId, ticket.id)">
          <el-icon size="20" :color="Colors.primaryGreen">
            <Delete />
          </el-icon>
        </button>
      </div>
    </div>
    <div class="textContainer" v-if="isHovered">
      <p class="description">{{ ticket.description }}</p>
    </div>
  </div>
  <el-dialog
    v-model="isDialogOpen"
    title="Edit ticket"
    width="500"
    :before-close="stopEditing"
    :style="{ display: isDialogOpen ? 'block' : 'none' }"
  >
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="Ticket name">
        <el-input v-model="form.name" :placeholder="form.name" />
      </el-form-item>
      <el-form-item label="Ticket description">
        <el-input v-model="form.description" :placeholder="form.description" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="editTicketHandler"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.title {
  font-weight: bold;
}
.titleContainer {
  display: flex;
  gap: 5px;
}
.card button {
  background-color: transparent;
  border: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.buttonsContainer {
  display: flex;
  gap: 5px;
}
.card {
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 3px var(--primary-green), 3px 3px 15px var(--primary-green);
  width: 90%;
  padding: 10px;
}
.textContainer {
  display: flex;
  gap: 10px;
}
</style>
