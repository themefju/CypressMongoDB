/// <reference types="cypress" />
import { serialize } from 'bson';
import {
  InsertArgs,
  InsertManyArgs,
} from '../../../../utils/plugins/mongo/models/options';

export function insertOne(args: InsertArgs) {
  args.document = serialize(args.document);

  return cy.task('insertOne', args).then((result: any) => {
    return result;
  });
}

export function insertMany(args: InsertManyArgs) {
  args.documents = serialize(args.documents);

  return cy.task('insertMany', args).then((result: any) => {
    return result;
  });
}
