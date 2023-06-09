/// <reference types="cypress" />
import { serialize } from 'bson';
import { UpdateArgs } from '../../../../utils/plugins/mongo/models/options';

export function updateOne(args: UpdateArgs) {
  args.filter = serialize(args.filter);
  args.update = serialize(args.update);

  return cy.task('updateOne', args).then((result: any) => {
    return result;
  });
}

export function updateMany(args: UpdateArgs) {
  args.filter = serialize(args.filter);
  args.update = serialize(args.update);

  return cy.task('updateMany', args).then((result: any) => {
    return result;
  });
}
