import cosineSimilarity from 'src/function/embeddingSimilarity';
import { db } from './db';
import cloneDeep from 'lodash/cloneDeep';

export const getAllEmployees = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM employees',
        [],
        (_, { rows }) => {
          console.log('rows: ', rows.item(2));
          resolve(rows._array);
        },
        (_, err) => reject(err),
      );
    });
  });
};

export const getEmployeeById = id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM employees WHERE id = ?',
        [id],
        (_, { rows }) => {
          resolve(rows.item(0));
        },
        (_, err) => reject(err),
      );
    });
  });
};

export const findBestMatchingEmployee = (empEmbedding: string) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM employees',
        [],
        (_, { rows }) => {
          let matchedEmployee: any[] = [];

          for (let i = 0; i < rows.length; i++) {
            const row = cloneDeep(rows.item(i));
            let embedding = row?.embedding;

            try {
              embedding = JSON.parse(embedding);
            } catch (error) {
              console.warn('Invalid embedding for employee:', row.id);
              continue;
            }
            if (!embedding) continue;

            const matchCount = cosineSimilarity(empEmbedding, embedding);

            matchedEmployee.push({ ...row, matchCount });
          }

          if (matchedEmployee.length > 0) {
            matchedEmployee = matchedEmployee
              ?.sort((a, b) => +a.matchCount - +b.matchCount)
              ?.reverse();
            resolve({
              isFallback: true,
              matchedEmployee: matchedEmployee?.slice(0, 10),
            });
          } else {
            resolve({
              isFallback: false,
              matchedEmployee: [],
            });
          }
        },
        (tx, error) => reject(error),
      );
    });
  });
};
