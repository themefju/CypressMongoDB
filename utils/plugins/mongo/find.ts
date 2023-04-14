import { deserialize, serialize } from 'bson';
import { client, defaultOptions } from './connect';
import { Options, QueryOptions } from './models/options';
import { defaults } from '../../utils';

export async function findOne(args: QueryOptions) {
  const options: Options = defaults(defaultOptions, args);
  options.query = deserialize(Buffer.from(options.query as Buffer));

  return await client(options.uri)
    .connect()
    .then(async (client) => {
      return await client
        .db(options.dbName)
        .collection(options.collection)
        .findOne(options.query)
        .then((result) => {
          if (result) {
            return serialize(result);
          } else {
            return null;
          }
        })
        .catch((err) => {
          throw err;
        })
        .finally(() => {
          client.close();
        });
    });
}
