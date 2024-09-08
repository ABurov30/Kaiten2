import { v4 as uuidv4 } from 'uuid';

import { Column, Member, Project, Ticket } from '../../entities/types';

const mockMembers: Member[] = [
  { id: uuidv4(), name: 'Alice' },
  { id: uuidv4(), name: 'Bob' },
  { id: uuidv4(), name: 'Charlie' },
  { id: uuidv4(), name: 'Diana' },
  { id: uuidv4(), name: 'Eve' },
  { id: uuidv4(), name: 'Frank' },
];

const mockTickets: Ticket[] = [
  { id: uuidv4(), name: 'Fix bug', description: 'Fix the login bug', isDone: false },
  { id: uuidv4(), name: 'Implement feature', description: 'Add user profile feature', isDone: true },
  { id: uuidv4(), name: 'Design UI', description: 'Create mockups for the new UI', isDone: false },
  { id: uuidv4(), name: 'Set up database', description: 'Configure the database for the application', isDone: false },
  { id: uuidv4(), name: 'Write documentation', description: 'Document the API endpoints', isDone: true },
];

const mockColumns: Column[] = [
  { id: uuidv4(), name: 'To Do', tickets: [mockTickets[0], mockTickets[3]] },
  { id: uuidv4(), name: 'In Progress', tickets: [mockTickets[1]] },
  { id: uuidv4(), name: 'To Do', tickets: [mockTickets[2]] },
  { id: uuidv4(), name: 'In Progress', tickets: [] },
  { id: uuidv4(), name: 'Done', tickets: [mockTickets[4]] },
];

export const mockProjects: Project[] = [
  {
    id: uuidv4(),
    name: 'Project Alpha',
    columns: [mockColumns[0], mockColumns[1]],
    members: [mockMembers[0], mockMembers[1]],
    isCurrent: true,
  },
  {
    id: uuidv4(),
    name: 'Project Beta',
    columns: [mockColumns[2], mockColumns[3]],
    members: [mockMembers[2], mockMembers[3]],
    isCurrent: false,
  },
  {
    id: uuidv4(),
    name: 'Project Gamma',
    columns: [mockColumns[4]],
    members: [mockMembers[4], mockMembers[5]],
    isCurrent: false,
  },
];
