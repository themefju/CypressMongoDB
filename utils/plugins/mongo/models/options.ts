import { Document } from 'mongodb';

export interface ConnectOptions {
  uri: string;
  dbName: string;
}

export interface QueryOptions {
  collection: string;
  document?: Document;
  documents?: any;
  filter?: Document;
  options?: object;
  pipeline?: any;
  query?: Document;
  update?: object;
}

export type Options = ConnectOptions & QueryOptions;
