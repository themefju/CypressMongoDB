import { deserialize } from 'bson';
import { ConnectOptions, DeleteArgs } from './models/options';
import { defaults } from '../../utils';
import { client, defaultOptions } from './connect';

export async function deleteOne(args: DeleteArgs) {
  const options: ConnectOptions & DeleteArgs = defaults(defaultOptions, args);
  options.filter = deserialize(Buffer.from(options.filter as Buffer));

  return await client(options.uri)
    .connect()
    .then(async (client) => {
      return client
        .db(options.dbName)
        .collection(options.collection)
        .deleteOne(options.filter)
        .then((result) => {
          return result;
        })
        .catch((err) => {
          throw err;
        })
        .finally(() => {
          client.close();
        });
    });
}

export async function deleteMany(args: DeleteArgs) {
  const options: ConnectOptions & DeleteArgs = defaults(defaultOptions, args);
  options.filter = deserialize(Buffer.from(options.filter as Buffer));

  return await client(options.uri)
    .connect()
    .then(async (client) => {
      return client
        .db(options.dbName)
        .collection(options.collection)
        .deleteMany(options.filter)
        .then((result) => {
          return result;
        })
        .catch((err) => {
          throw err;
        })
        .finally(() => {
          client.close();
        });
    });
}
