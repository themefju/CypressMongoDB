import { Document } from 'mongodb';
import { deserialize, serialize } from 'bson';
import { AggregateArgs, ConnectOptions } from './models/options';
import { defaults } from '../../utils';
import { client, defaultOptions } from './connect';

export async function aggregate(args: AggregateArgs) {
  const options: ConnectOptions & AggregateArgs = defaults(
    defaultOptions,
    args
  );
  options.pipeline = Object.values(
    deserialize(Buffer.from(options.pipeline as Buffer))
  );

  return await client(options.uri)
    .connect()
    .then(async (client) => {
      return await client
        .db(options.dbName)
        .collection(options.collection)
        .aggregate(options.pipeline as Document[], options.options)
        .toArray()
        .then((result) => {
          return serialize(result);
        })
        .catch((err) => {
          throw err;
        })
        .finally(() => {
          client.close();
        });
    });
}
