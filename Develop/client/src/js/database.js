import { openDB } from 'idb';

const initdb = async () => {
 await openDB('jateDB', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate store already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate store created');
    },
  });
  console.log('DB OPEN');
};

export const putDb = async (content) => {
  console.log('PUT request sent to the jateDB');
  const jateDb = await openDB('jateDB', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
};

export const getDb = async () => {

  console.log('GET all from the jateDB');
  const jateDb = await openDB('jateDB', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;
  return result?.value;
};

initdb();
