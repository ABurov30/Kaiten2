import { Entity } from '../shared/types/entity';

export interface Project extends Entity {
  columns: Column[];
  goals: Goal[];
  isCurrent: boolean;
}

export interface Goal extends Entity {}

export interface Column extends Entity {
  tickets: Ticket[];
}

export interface Ticket extends Entity {
  description: string;
}
