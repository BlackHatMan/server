import { fileURLToPath } from 'url';
import crypto from 'node:crypto';
import { dirname } from 'path';
import express from 'express';
import fs from 'node:fs';

const __dirname = fileURLToPath(dirname(import.meta.url));

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/style.css', function (req, res) {
  res.sendFile(__dirname + '/' + 'index.css');
});

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.get('/form', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendFile('/template/form.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  res.set('Content-Type', 'text/plain');
  const data = fs.readFileSync('db.json', 'utf-8');
  const obj = JSON.parse(data);

  res.send(obj);
});

app.post('/add_user', (req, res) => {
  const data = fs.readFileSync('db.json');
  const db = JSON.parse(data);

  const obg = {
    ...req.body,
    UUID: crypto.randomUUID(),
  };

  db.push(obg);

  fs.writeFileSync('db.json', JSON.stringify(db));
  res.setHeader('Content-Type', 'application/json');
  res.json(db);
});

app.listen(process.env.PORT || PORT, () => {
  console.log('listening port ' + PORT);
});
