/// <reference types="cypress" />
import { findOne } from './utils/mongo/find';

it('works', () => {
  expect(true).to.be.true;
});

context('findOne', () => {
  it('returns null', () => {
    findOne({
      query: { framework: '84302' },
      collection: 'api-tests',
    }).then((result) => {
      expect(result).to.be.null;
    });
  });

  it('works with _id = ObjectId', () => {
    findOne({
      query: { type: 'not nested ObjectId' },
      collection: 'api-tests',
    }).then((result) => {
      expect(result).to.not.be.null;
      expect(result.test).to.equal('ObjectId');
    });
  });

  it('works with _id = UUID', () => {
    findOne({
      query: { type: 'not nested UUID' },
      collection: 'api-tests',
    }).then((result) => {
      expect(result).to.not.be.null;
      expect(result.test).to.equal('UUID');
    });
  });

  it('works with nested _id = ObjectId', () => {
    findOne({
      query: { type: 'nested ObjectId' },
      collection: 'api-tests',
    }).then((result) => {
      findOne({ query: { _id: result['_id'] }, collection: 'api-tests' }).then(
        (nestedResult) => {
          expect(nestedResult).to.not.be.null;
          expect(nestedResult.test).to.equal('ObjectId');
          expect(nestedResult.type).to.equal('nested ObjectId');
        }
      );
    });
  });

  it('works with nested _id = UUID', () => {
    findOne({
      query: { type: 'nested UUID' },
      collection: 'api-tests',
    }).then((result) => {
      findOne({ query: { _id: result['_id'] }, collection: 'api-tests' }).then(
        (nestedResult) => {
          expect(nestedResult).to.not.be.null;
          expect(nestedResult.test).to.equal('UUID');
          expect(nestedResult.type).to.equal('nested UUID');
        }
      );
    });
  });
});
