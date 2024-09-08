// @ts-nocheck
import { defineStore } from 'pinia';
import { App, Theme } from './types';

interface State {
  app: App;
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): State => ({
    app: localStorage.getItem('app') ? JSON.parse(localStorage.getItem('app')) : { theme: Theme.light },
  }),
  getters: {
    getTheme: (state) => state.app.theme,
  },
  actions: {
    changeTheme() {
      this.app.theme = this.app.theme === Theme.light ? Theme.dark : Theme.light;
      this.syncStateWithLocalStorage();
    },
    syncStateWithLocalStorage() {
      localStorage.setItem('app', JSON.stringify(this.app));
    },
  },
});
