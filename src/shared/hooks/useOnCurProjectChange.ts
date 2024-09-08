import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useProjectsStore } from '../../entities/store';

export const useOnCurProjectChange = (cb: () => void) => {
  const store = useProjectsStore();
  const { getCurrentProject } = storeToRefs(store);
  watch(
    () => getCurrentProject.value?.id,
    (prev, cur) => {
      if (prev !== cur) {
        cb();
      }
    }
  );
};
