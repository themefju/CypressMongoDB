/// <reference types="cypress" />
import { findOne } from './utils/mongo/find';

it('works', () => {
  expect(true).to.be.true;
});

context('findOne', () => {
  it('works', () => {
    findOne({
      query: { framework: 'Cypress' },
      collection: 'api-tests',
    }).then((r) => {
      expect(r).to.not.be.null;
    });
  });

  it('returns null', () => {
    findOne({
      query: { framework: '84302' },
      collection: 'api-tests',
    }).then((r) => {
      expect(r).to.be.null;
    });
  });

  it('works with _id = UUID', () => {
    findOne({
      query: { framework: 1 },
      collection: 'api-tests',
    }).then((r) => {
      expect(r).to.not.be.null;
    });
  });

  it('works with nested _id = ObjectId', () => {
    findOne({
      query: { framework: 'Cypress' },
      collection: 'api-tests',
    }).then((r) => {
      findOne({ query: { _id: r['_id'] }, collection: 'api-tests' }).then(
        (r) => expect(r).to.not.be.null
      );
    });
  });

  it('works with nested _id = UUID', () => {
    findOne({
      query: { framework: 1 },
      collection: 'api-tests',
    }).then((r) => {
      findOne({ query: { _id: r['_id'] }, collection: 'api-tests' }).then(
        (r) => expect(r).to.not.be.null
      );
    });
  });
});
