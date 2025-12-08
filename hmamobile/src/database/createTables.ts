import { db } from './db';

export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT,
        embedding TEXT,
        base64 TEXT
      );
      `,
    );
  });
};
