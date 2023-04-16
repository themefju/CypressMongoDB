import { deserialize, serialize } from 'bson';
import { AggregateArgs } from '../../../../utils/plugins/mongo/models/options';

export function aggregate(args: AggregateArgs) {
  args.pipeline = serialize(args.pipeline);

  return cy.task('aggregate', args).then((result: any) => {
    return Object.values(deserialize(Buffer.from(result) as Buffer));
  });
}
