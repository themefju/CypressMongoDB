/// <reference types="cypress" />
import { find, findOne } from './utils/mongo/find';
import { insertMany, insertOne } from './utils/mongo/insert';

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

context('find', () => {
  it('returns empty array', () => {
    find({
      query: { framework: '84302' },
      collection: 'api-tests',
    }).then((result) => {
      expect(result).to.deep.equal([]);
    });
  });

  it('works with _id = ObjectId', () => {
    find({
      query: { test: 'ObjectId' },
      collection: 'api-tests',
    }).then((result) => {
      expect(result).to.not.be.null;
      expect(result).to.have.lengthOf(2);
    });
  });

  it('works with _id = UUID', () => {
    find({
      query: { test: 'UUID' },
      collection: 'api-tests',
    }).then((result) => {
      expect(result).to.not.be.null;
      expect(result).to.have.lengthOf(2);
    });
  });
});

context('insertOne', () => {
  it('inserts one document', () => {
    insertOne({
      document: { inserted: Cypress._.random(0, 100), hurra: true },
      collection: 'api-tests',
    }).then((result) => {
      expect(result.acknowledged).to.be.true;
    });
  });

  it('inserts many documents at once', () => {
    insertMany({
      documents: [
        {
          inserted: Cypress._.random(100, 1000),
          hurra: true,
          manyAtOnce: true,
        },
        {
          inserted: Cypress._.random(100, 1000),
          hurra: true,
          manyAtOnce: true,
        },
      ],
      collection: 'api-tests',
    }).then((result) => {
      expect(result.acknowledged).to.be.true;
    });
  });
});
