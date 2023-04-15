import { Document } from 'mongodb';

export interface ConnectOptions {
  uri: string;
  dbName: string;
}

export interface QueryOptions {
  collection: string;
  document?: Document;
  documents?: any;
  pipeline?: any;
  query?: Document;
}

export type Options = ConnectOptions & QueryOptions;
