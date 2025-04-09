import { IDBPDatabase, openDB } from "idb";

import { Stores } from "./stores";

type DbConnections = {
  [key: string]: Promise<IDBPDatabase>;
};

const dbConnections: DbConnections = {};
const dbVersion = 1;
const dbUpgrades = {
  upgrade(db: IDBPDatabase): void {
    if (!db.objectStoreNames.contains(Stores.TODOS)) {
      db.createObjectStore(Stores.TODOS);
    }
  },
};

export function getDb(name?: string): Promise<IDBPDatabase> {
  const dbName = name || "ANON_USER";
  if (!dbConnections[dbName]) {
    dbConnections[dbName] = openDB(dbName, dbVersion, dbUpgrades);
  }
  return dbConnections[dbName];
}
