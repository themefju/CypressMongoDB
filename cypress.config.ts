import { defineConfig } from 'cypress';
import { findOne, find } from './utils/plugins/mongo/find';

export default defineConfig({
  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {
      on('task', {
        find,
        findOne,
      });
    },
  },
});
