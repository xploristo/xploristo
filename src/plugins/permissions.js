import _get from 'lodash.get';

import { useUserStore } from '../stores/user.js';

export const hasPermissionTo = (action) => {
  const userStore = useUserStore();
  const userPermissions = userStore.permissions;

  return !!_get(userPermissions, action);
};

export default {
  install: (app) => {
    app.config.globalProperties.$hasPermissionTo = (action) =>
      hasPermissionTo(action);
  },
};
