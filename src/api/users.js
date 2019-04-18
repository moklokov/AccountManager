import { openDB } from 'idb';

async function getDB(dbName = 'AccountManager') {
   const db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('users')) {
        const users = db.createObjectStore('users', {
          keyPath: 'id',
          autoIncrement: true,
        });
        users.createIndex('username', 'username', { unique: true });
        users.createIndex('email', 'email', { unique: true });
      }
    }
  });
  return db;
}

export async function getUsers() {
  const db = await getDB();
  return db.getAll('users');
}

export async function getUser(id) {
  const db = await getDB();
  return db.get('users', id);
}

export async function getUserByUsername(username) {
  const db = await getDB();
  return db.getFromIndex('users', 'username', username);
}

export async function getUserByEmail(email) {
  const db = await getDB();
  return db.getFromIndex('users', 'email', email);
}

export async function createUser(attrs) {
  const db = await getDB();
  const id = await db.add('users', attrs);
  return { ...attrs, id }
}

export async function updateUser(user) {
  const db = await getDB();
  await db.put('users', user);
  return user;
}

export async function removeUser(id) {
  const db = await getDB();
  return db.delete('users', id);
}

export async function clear() {
  const db = await getDB();
  return db.clear('users');
}
