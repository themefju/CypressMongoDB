/// <reference types="cypress" />
import { serialize } from 'bson';
import { DeleteArgs } from '../../../../utils/plugins/mongo/models/options';

export function deleteOne(args: DeleteArgs) {
  args.filter = serialize(args.filter);

  return cy.task('deleteOne', args).then((result: any) => {
    return result;
  });
}

export function deleteMany(args: DeleteArgs) {
  args.filter = serialize(args.filter);

  return cy.task('deleteMany', args).then((result: any) => {
    return result;
  });
}
