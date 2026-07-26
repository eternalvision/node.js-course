import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync(':memory:');
db.exec('CREATE TABLE tasks (id INTEGER PRIMARY KEY, title TEXT NOT NULL)');
const insert = db.prepare('INSERT INTO tasks (title) VALUES (?)');
insert.run('Изучить node:sqlite');
console.table(db.prepare('SELECT * FROM tasks').all());
db.close();
