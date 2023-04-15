import { deserialize, serialize } from 'bson';
import { QueryOptions } from '../../../../utils/plugins/mongo/models/options';

export function aggregate(args: QueryOptions) {
  args.pipeline = serialize(args.pipeline);

  return cy.task('aggregate', args).then((result: any) => {
    return Object.values(deserialize(Buffer.from(result) as Buffer));
  });
}
