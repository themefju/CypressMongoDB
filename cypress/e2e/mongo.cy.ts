/// <reference types="cypress" />
import { Collections } from './utils/collections';
import { deleteAllDataInDB, insertDataInDB } from './utils/mongo';
import { aggregate } from './utils/mongo/aggregate';
import { deleteMany, deleteOne } from './utils/mongo/delete';
import { find, findOne } from './utils/mongo/find';
import { insertMany, insertOne } from './utils/mongo/insert';
import { updateMany, updateOne } from './utils/mongo/update';

it('works', () => {
  expect(true).to.be.true;
});

context('findOne', () => {
  beforeEach(() => {
    deleteAllDataInDB();
    insertDataInDB();
  });

  it('returns null', () => {
    findOne({
      query: { framework: '84302' },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result).to.be.null;
    });
  });

  it('works with _id = ObjectId', () => {
    findOne({
      query: { type: 'not nested ObjectId' },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result).to.not.be.null;
      expect(result.test).to.equal('ObjectId');
    });
  });

  it('works with _id = UUID', () => {
    findOne({
      query: { type: 'not nested UUID' },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result).to.not.be.null;
      expect(result.test).to.equal('UUID');
    });
  });

  it('works with nested _id = ObjectId', () => {
    findOne({
      query: { type: 'nested ObjectId' },
      collection: Collections.ApiTests,
    }).then((result) => {
      findOne({
        query: { _id: result['_id'] },
        collection: Collections.ApiTests,
      }).then((nestedResult) => {
        expect(nestedResult).to.not.be.null;
        expect(nestedResult.test).to.equal('ObjectId');
        expect(nestedResult.type).to.equal('nested ObjectId');
      });
    });
  });

  it('works with nested _id = UUID', () => {
    findOne({
      query: { type: 'nested UUID' },
      collection: Collections.ApiTests,
    }).then((result) => {
      findOne({
        query: { _id: result['_id'] },
        collection: Collections.ApiTests,
      }).then((nestedResult) => {
        expect(nestedResult).to.not.be.null;
        expect(nestedResult.test).to.equal('UUID');
        expect(nestedResult.type).to.equal('nested UUID');
      });
    });
  });
});

context('find', () => {
  beforeEach(() => {
    deleteAllDataInDB();
    insertDataInDB();
  });

  it('returns empty array', () => {
    find({
      query: { framework: '84302' },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result).to.deep.equal([]);
    });
  });

  it('works with _id = ObjectId', () => {
    find({
      query: { test: 'ObjectId' },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result).to.not.be.null;
      expect(result).to.have.lengthOf(2);
    });
  });

  it('works with _id = UUID', () => {
    find({
      query: { test: 'UUID' },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result).to.not.be.null;
      expect(result).to.have.lengthOf(2);
    });
  });
});

context('insert', () => {
  beforeEach(() => {
    deleteAllDataInDB();
  });

  it('inserts one document', () => {
    insertOne({
      document: { inserted: 1, hurra: false },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result.acknowledged).to.be.true;
    });
  });

  it('inserts many documents at once', () => {
    insertMany({
      documents: [
        {
          inserted: 2,
          hurra: true,
          manyAtOnce: true,
        },
        {
          inserted: 3,
          hurra: true,
          manyAtOnce: true,
        },
        {
          inserted: 4,
          hurra: true,
          manyAtOnce: true,
        },
        {
          inserted: 5,
          hurra: true,
          manyAtOnce: true,
        },
        {
          inserted: 6,
          hurra: true,
          manyAtOnce: true,
        },
      ],
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result.acknowledged).to.be.true;
    });
  });
});

context('update', () => {
  beforeEach(() => {
    deleteAllDataInDB();
    insertDataInDB();
  });

  it('updates one document', () => {
    updateOne({
      filter: { updateOne: true },
      update: { $set: { updateManyFields: false } },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result.acknowledged).to.be.true;
      expect(result.matchedCount).to.equal(1);
      expect(result.modifiedCount).to.equal(1);
      expect(result.upsertedId).to.be.null;
    });
  });

  it('updates many documents at once', () => {
    updateMany({
      filter: { updateOne: false },
      update: { $set: { updateManyFields: true } },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result.acknowledged).to.be.true;
      expect(result.matchedCount).to.equal(5);
      expect(result.modifiedCount).to.equal(5);
    });
  });
});

context('aggregate', () => {
  beforeEach(() => {
    deleteAllDataInDB();
    insertDataInDB();
  });

  it('aggregate one document', () => {
    aggregate({
      pipeline: [
        { $match: { inserted: { $in: [1, 6] } } },
        { $set: { aggregated: true } },
      ],
      collection: Collections.ApiTests,
    }).then((result) => {
      if (!result) throw new Error("Result can't be null or undefined");

      expect(result).to.not.be.null;
      expect(result).to.have.length(2);

      findOne({
        query: { _id: result[0]['_id'] },
        collection: Collections.ApiTests,
      }).then((result) => {
        expect(result).to.not.be.null;
        expect(result.inserted).to.equal(1);
      });
    });
  });
});

context('delete', () => {
  beforeEach(() => {
    deleteAllDataInDB();
    insertDataInDB();
  });

  it('deletes one document', () => {
    deleteOne({
      filter: { inserted: 3 },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result.acknowledged).to.be.true;
    });
  });

  it('works with _id = UUID', () => {
    findOne({
      query: { test: 'UUID' },
      collection: Collections.ApiTests,
    }).then((result) => {
      if (!result) throw new Error("Result can't be null or undefined");

      deleteOne({
        filter: { _id: result['_id'] },
        collection: Collections.ApiTests,
      }).then((nestedResult) => {
        expect(nestedResult.acknowledged).to.be.true;
      });
    });
  });

  it('works with _id = ObjectId', () => {
    findOne({
      query: { test: 'ObjectId' },
      collection: Collections.ApiTests,
    }).then((result) => {
      if (!result) throw new Error("Result can't be null or undefined");

      deleteOne({
        filter: { _id: result['_id'] },
        collection: Collections.ApiTests,
      }).then((nestedResult) => {
        expect(nestedResult.acknowledged).to.be.true;
      });
    });
  });

  it('deletes many documents at once', () => {
    deleteMany({
      filter: { manyAtOnce: true },
      collection: Collections.ApiTests,
    }).then((result) => {
      expect(result.acknowledged).to.be.true;

      find({
        query: {},
        collection: Collections.ApiTests,
      }).then((result) => {
        expect(result).to.deep.equal([]);
      });
    });
  });
});
