import { Document } from 'mongodb';
import { deserialize } from 'bson';
import { Options, QueryOptions } from './models/options';
import { defaults } from '../../utils';
import { client, defaultOptions } from './connect';

export async function insertOne(args: QueryOptions) {
  const options: Options = defaults(defaultOptions, args);
  options.document = deserialize(Buffer.from(options.document as Buffer));

  return await client(options.uri)
    .connect()
    .then(async (client) => {
      return await client
        .db(options.dbName)
        .collection(options.collection)
        .insertOne(options.document)
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

export async function insertMany(args: QueryOptions) {
  const options: Options = defaults(defaultOptions, args);
  options.documents = deserialize(Buffer.from(options.documents as Buffer));
  options.documents = Object.values(options.documents);

  return await client(options.uri)
    .connect()
    .then(async (client) => {
      return await client
        .db(options.dbName)
        .collection(options.collection)
        .insertMany(options.documents)
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
