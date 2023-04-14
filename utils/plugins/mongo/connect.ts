import { MongoClient } from 'mongodb';
import { UUID } from 'bson';
import { ConnectOptions } from './models/options.js';
import * as dotenv from 'dotenv';
dotenv.config();

export const defaultOptions: ConnectOptions = {
  uri: process.env.MONGO_URI,
  dbName: process.env.MONGO_DB,
};

export function client(uri: string) {
  return new MongoClient(uri, {
    pkFactory: { createPk: () => new UUID().toBinary() },
  });
}
