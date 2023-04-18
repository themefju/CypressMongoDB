import { Document } from 'mongodb';

export interface ConnectOptions {
  uri: string;
  dbName: string;
}

export interface BasicArgs {
  collection: string;
}

export interface AggregateArgs extends BasicArgs {
  pipeline: Document[] | Buffer;
  options?: Document;
}

export interface DeleteArgs extends BasicArgs {
  filter: Document;
}

export interface FindArgs extends BasicArgs {
  query: Document;
}

export interface InsertArgs extends BasicArgs {
  document: Document;
}

export interface InsertManyArgs extends BasicArgs {
  documents: Document[] | Buffer;
}

export interface UpdateArgs extends BasicArgs {
  filter: Document;
  update: Document | Document[];
  options?: Document;
}
