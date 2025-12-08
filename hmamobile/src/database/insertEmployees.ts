import { getEmbedding } from 'src/native/FaceEmbed';
import { db } from './db';
import sanitizeBase64 from 'src/function/sanitizeBase64';

// export const insertEmployees = (employees:any) => {
//   db.transaction((tx:any) => {
//     employees.forEach(async(emp:any) => {
//       const embedding = emp?.base64 ? await getEmbedding(sanitizeBase64(emp?.base64)) : ""
//       tx.executeSql(
//         `INSERT OR REPLACE INTO employees (id, name, embedding, base64) VALUES (?, ?, ?, ?)`,
//         [emp.id, emp.name, JSON.stringify(emp.embedding), emp.base64],
//       );
//     });
//   });
// };

export const insertEmployees = async (employees: any) => {
  for (const emp of employees) {
    const cleanBase64 = sanitizeBase64(emp.image);

    const embeddingStr = cleanBase64
      ? await getEmbedding(cleanBase64) // returns comma string
      : '';

    await new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT OR REPLACE INTO employees (id, name, embedding, base64)
           VALUES (?, ?, ?, ?)`,
          [emp.id, emp.name, JSON.stringify(embeddingStr), emp.image],
          () => {
            console.log('##### RECORD CREATED ######');
            resolve();
          },
          (_, err) => reject(err),
        );
      });
    });
  }
};
