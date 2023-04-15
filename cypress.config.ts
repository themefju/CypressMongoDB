import { defineConfig } from 'cypress';
import { deleteMany, deleteOne } from './utils/plugins/mongo/delete';
import { findOne, find } from './utils/plugins/mongo/find';
import { insertMany, insertOne } from './utils/plugins/mongo/insert';
import { updateMany, updateOne } from './utils/plugins/mongo/update';

export default defineConfig({
  e2e: {
    supportFile: false,
    setupNodeEvents(on, config) {
      on('task', {
        deleteMany,
        deleteOne,
        find,
        findOne,
        insertMany,
        insertOne,
        updateMany,
        updateOne,
      });
    },
  },
});
