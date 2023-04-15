/// <reference types="cypress" />
import { serialize } from 'bson';
import { QueryOptions } from '../../../../utils/plugins/mongo/models/options';

export function deleteOne(args: QueryOptions) {
  args.filter = serialize(args.filter);

  return cy.task('deleteOne', args).then((result: any) => {
    return result;
  });
}

export function deleteMany(args: QueryOptions) {
  args.filter = serialize(args.filter);

  return cy.task('deleteMany', args).then((result: any) => {
    return result;
  });
}
