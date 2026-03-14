import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface FlyoutConfig {
  title: string;
  component: string;
  props?: Record<string, any>;
  onClose?: () => void;
}

export const useFlyoutStore = defineStore('flyout', () => {
  const isOpen = ref(false);
  const config = ref<FlyoutConfig | null>(null);

  const open = (flyoutConfig: FlyoutConfig) => {
    config.value = flyoutConfig;
    isOpen.value = true;
  };

  const close = () => {
    if (config.value?.onClose) {
      config.value.onClose();
    }
    isOpen.value = false;
    config.value = null;
  };

  const toggle = () => {
    if (isOpen.value) {
      close();
    } else if (config.value) {
      isOpen.value = true;
    }
  };

  return {
    isOpen,
    config,
    open,
    close,
    toggle,
  };
});
