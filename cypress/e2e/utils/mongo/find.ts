/// <reference types="cypress" />
import { serialize, deserialize } from 'bson';
import { QueryOptions } from '../../../../utils/plugins/mongo/models/options';

export function findOne(args: QueryOptions) {
  args.query = serialize(args.query);

  return cy.task('findOne', args).then((result: any) => {
    if (result) {
      return deserialize(Buffer.from(result as Buffer));
    } else {
      return null;
    }
  });
}

export function find(args: QueryOptions) {
  args.query = serialize(args.query);

  return cy.task('find', args).then((result: any) => {
    return Object.values(deserialize(Buffer.from(result as Buffer)));
  });
}
