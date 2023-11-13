import { openDB } from 'idb';
//This function, when invoked, creates the first version of the jate DB and the corresponding object store of the same name if it doesn't exist.
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//Function that allows the updating of the jate DB every time the editor loses focus by retrieving the content from localStorage. See editor.js.
export const putDb = async (content) => {
  try {
    console.log("PUT to the database");
    const jateDb = await openDB("jate", 1);
    const tx = jateDb.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    const request = store.put({ id: 1, value: content });
    const result = await request;
    console.log("Updated the database with the following data: ", result);
  } catch (err) {
    console.error(err.message);
  }
};

//This function will allow us to set the initial value/content of the editor to whatever is stored in the jate DB if there is anything at all. See editor.js.
export const getDb = async () => {
  console.log("GET from the database");
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.get(1);
  const result = await request;
  return result?.value;
};
//Invoking the initdb function.
initdb();
