/// <reference types="cypress" />
import { serialize } from 'bson';
import { QueryOptions } from '../../../../utils/plugins/mongo/models/options';

export function insertOne(args: QueryOptions) {
  args.document = serialize(args.document);

  return cy.task('insertOne', args).then((result: any) => {
    return result;
  });
}

export function insertMany(args: QueryOptions) {
  args.documents = serialize(args.documents);

  return cy.task('insertMany', args).then((result: any) => {
    return result;
  });
}
