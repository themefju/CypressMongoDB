import { defineConfig } from 'cypress';
import { findOne, find } from './utils/plugins/mongo/find';
import { insertMany, insertOne } from './utils/plugins/mongo/insert';

export default defineConfig({
  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {
      on('task', {
        find,
        findOne,
        insertMany,
        insertOne,
      });
    },
  },
});
