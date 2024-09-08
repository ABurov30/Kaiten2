import { Column } from 'element-plus';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { Goal, Project, Ticket } from './types';

interface State {
  projects: Project[];
}

export const useProjectsStore = defineStore({
  id: 'projects',
  state: (): State => ({
    projects: localStorage.getItem('projects') ? JSON.parse(localStorage.getItem('projects')) : [],
  }),
  getters: {
    getCurrentProject: (state) => state.projects.find((project) => project.isCurrent),
    getCurrentProjectGoals(): Goal[] {
      const currentProject = this.getCurrentProject;
      return currentProject ? currentProject?.goals : [];
    },
  },
  actions: {
    set(data: Project[]) {
      this.projects = data;
    },
    setCurrentProject(id: string) {
      this.projects = this.projects.map((project) => {
        if (project.id === id) {
          return { ...project, isCurrent: true };
        } else {
          return { ...project, isCurrent: false };
        }
      });
      this.syncStateWithLocalStorage();
    },
    renameProject(id: string, newName: string) {
      this.projects = this.projects.map((project) => {
        if (project.id === id) {
          return { ...project, name: newName };
        }
        return project;
      });
      this.syncStateWithLocalStorage();
    },
    deleteProject(id: string) {
      this.projects = this.projects.filter((project) => {
        if (project.id !== id) {
          return project;
        }
      });
      const currentProject = this.getCurrentProject;
      if (id === currentProject?.id) {
        this.setCurrentProject('');
      }
      this.syncStateWithLocalStorage();
    },
    addProject() {
      this.projects = [
        { id: uuidv4(), name: 'New project', columns: [], goals: [], isCurrent: false },
        ...this.projects,
      ];
      this.syncStateWithLocalStorage();
    },
    renameColumn(id: string, newName: string) {
      const currentProject = this.getCurrentProject;
      this.projects = this.projects.map((project) => {
        if (project.id === currentProject?.id) {
          return {
            ...project,
            columns: project.columns.map((column) => {
              if (column.id === id) {
                return { ...column, name: newName };
              } else {
                return column;
              }
            }),
          };
        } else {
          return project;
        }
      });
      this.syncStateWithLocalStorage();
    },
    deleteColumn(id: string) {
      const currentProject = this.getCurrentProject;
      this.projects = this.projects.map((project) => {
        if (project.id === currentProject?.id) {
          return {
            ...project,
            columns: project.columns.filter((column) => {
              if (column.id !== id) {
                return column;
              }
            }),
          };
        } else {
          return project;
        }
      });
      this.syncStateWithLocalStorage();
    },
    addColumn() {
      const currentProject = this.getCurrentProject;
      this.projects = this.projects.map((project) => {
        if (project.id === currentProject?.id) {
          return {
            ...project,
            columns: [...project.columns, { id: uuidv4(), name: 'New column', tickets: [] }],
          };
        } else {
          return project;
        }
      });
      this.syncStateWithLocalStorage();
    },
    addTicket(columnId: string, data: Ticket) {
      const currentProject = this.getCurrentProject;
      this.projects = this.projects.map((project) => {
        if (project.id === currentProject?.id) {
          return {
            ...project,
            columns: project.columns.map((column) => {
              if (column.id === columnId) {
                return {
                  ...column,
                  tickets: [
                    data ? data : { id: uuidv4(), name: 'New ticket', description: 'New description' },
                    ...column.tickets,
                  ],
                };
              } else {
                return column;
              }
            }),
          };
        } else {
          return project;
        }
      });
      this.syncStateWithLocalStorage();
    },
    deleteTicket(columnId: string, ticketId: string) {
      const currentProject = this.getCurrentProject;
      this.projects = this.projects.map((project) => {
        if (project.id === currentProject?.id) {
          return {
            ...project,
            columns: project.columns.map((column) => {
              if (column.id === columnId) {
                return {
                  ...column,
                  tickets: column.tickets.filter((ticket) => {
                    if (ticket.id !== ticketId) {
                      return ticket;
                    }
                  }),
                };
              } else {
                return column;
              }
            }),
          };
        } else {
          return project;
        }
      });
      this.syncStateWithLocalStorage();
    },
    editTicket(columnId: string, updatedTicket: Ticket) {
      const currentProject = this.getCurrentProject;
      this.projects = this.projects.map((project) => {
        if (project.id === currentProject?.id) {
          return {
            ...project,
            columns: project.columns.map((column) => {
              if (column.id === columnId) {
                return {
                  ...column,
                  tickets: column.tickets.map((ticket) => {
                    if (ticket.id === updatedTicket.id) {
                      return updatedTicket;
                    } else {
                      return ticket;
                    }
                  }),
                };
              } else {
                return column;
              }
            }),
          };
        } else {
          return project;
        }
      });
      this.syncStateWithLocalStorage();
    },
    deleteGoal(goalId: string) {
      const currentProject = this.getCurrentProject;
      this.projects = this.projects.map((project) => {
        if (project.id === currentProject?.id) {
          return {
            ...project,
            goals: project.goals.filter((goal) => {
              if (goal.id !== goalId) {
                return goal;
              }
            }),
          };
        } else {
          return project;
        }
      });
      this.syncStateWithLocalStorage();
    },
    addGoal() {
      const currentProject = this.getCurrentProject;
      this.projects = this.projects.map((project) => {
        if (project.id === currentProject?.id) {
          return {
            ...project,
            goals: [...project?.goals, { id: uuidv4(), name: 'New goal' }],
          };
        } else {
          return project;
        }
      });
      this.syncStateWithLocalStorage();
    },
    renameGoal(id: string, newName: string) {
      const currentProject = this.getCurrentProject;
      this.projects = this.projects.map((project) => {
        if (project.id === currentProject?.id) {
          return {
            ...project,
            goals: project.goals.map((goal) => {
              if (goal.id === id) {
                return { ...goal, name: newName };
              } else {
                return goal;
              }
            }),
          };
        } else {
          return project;
        }
      });
      this.syncStateWithLocalStorage();
    },
    moveTicket(ticket: Ticket, prevColumnId: string, newColumnId: string) {
      this.deleteTicket(prevColumnId, ticket.id);
      this.addTicket(newColumnId, ticket);
      this.syncStateWithLocalStorage();
    },
    reorderColumn(dragColumn: Column, dropColumn: Column) {
      const currentProject = this.getCurrentProject;
      this.projects = this.projects.map((project) => {
        if (project.id === currentProject?.id) {
          return {
            ...project,
            columns: project.columns.map((column) => {
              if (dropColumn.id === column.id) {
                return dragColumn;
              } else if (dragColumn.id === column.id) {
                return dropColumn;
              } else {
                return column;
              }
            }),
          };
        } else {
          return project;
        }
      });
      this.syncStateWithLocalStorage();
    },
    reorderTicket(dragTicket: Ticket, dropTicket: Ticket, columnId: string) {
      const currentProject = this.getCurrentProject;
      this.projects = this.projects.map((project) => {
        if (project.id === currentProject?.id) {
          return {
            ...project,
            columns: project.columns.map((column) => {
              if (column.id === columnId) {
                return {
                  ...column,
                  tickets: column.tickets.map((ticket) => {
                    if (ticket.id === dropTicket.id) {
                      return dragTicket;
                    } else if (ticket.id === dragTicket.id) {
                      return dropTicket;
                    } else {
                      return ticket;
                    }
                  }),
                };
              } else {
                return column;
              }
            }),
          };
        } else {
          return project;
        }
      });
      this.syncStateWithLocalStorage();
    },
    syncStateWithLocalStorage() {
      localStorage.setItem('projects', JSON.stringify(this.projects));
    },
  },
});
