import { Document } from 'mongodb';

export interface ConnectOptions {
  uri: string;
  dbName: string;
}

export interface AggregateArgs {
  collection: string;
  pipeline: Document[] | Buffer;
  options?: Document;
}

export interface DeleteArgs {
  collection: string;
  filter: Document;
}

export interface FindArgs {
  collection: string;
  query: Document;
}

export interface InsertArgs {
  collection: string;
  document: Document;
}

export interface InsertManyArgs {
  collection: string;
  documents: Document[] | Buffer;
}

export interface UpdateArgs {
  collection: string;
  filter: Document;
  update: Document | Document[];
  options?: Document;
}
