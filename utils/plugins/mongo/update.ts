import { deserialize } from 'bson';
import { client, defaultOptions } from './connect';
import { Options, QueryOptions } from './models/options';
import { defaults } from '../../utils';

export async function updateOne(args: QueryOptions) {
  const options: Options = defaults(defaultOptions, args);
  options.filter = deserialize(Buffer.from(options.filter as Buffer));
  options.update = deserialize(Buffer.from(options.update as Buffer));

  return await client(options.uri)
    .connect()
    .then(async (client) => {
      return await client
        .db(options.dbName)
        .collection(options.collection)
        .updateOne(options.filter, options.update, options.options)
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

export async function updateMany(args: QueryOptions) {
  const options: Options = defaults(defaultOptions, args);
  options.filter = deserialize(Buffer.from(options.filter as Buffer));
  options.update = deserialize(Buffer.from(options.update as Buffer));

  return await client(options.uri)
    .connect()
    .then(async (client) => {
      return await client
        .db(options.dbName)
        .collection(options.collection)
        .updateMany(options.filter, options.update, options.options)
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
