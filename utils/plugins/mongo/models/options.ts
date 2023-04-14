export interface ConnectOptions {
  uri: string;
  dbName: string;
}

export interface QueryOptions {
  collection: string;
  document?: object;
  documents?: Array<object>;
  pipeline?: Array<object>;
  query?: object;
}

export type Options = ConnectOptions & QueryOptions;
