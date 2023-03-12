import { fileURLToPath } from 'url';
import crypto from 'node:crypto';
import { dirname } from 'path';
import express from 'express';
import fs from 'node:fs';

const __dirname = fileURLToPath(dirname(import.meta.url));

const app = express();
const PORT = 3001;

app.get('/style.css', function (req, res) {
  res.sendFile(__dirname + '/' + 'index.css');
});

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendFile('/template/form.html', { root: __dirname });
});

app.post('/form', (req, res) => {
  res.set('Content-Type', 'text/plain');
  const data = fs.readFileSync('db.json', 'utf-8');
  const obj = JSON.parse(data);

  res.send(obj);
});

app.get('/home', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.listen(process.env.PORT || PORT, () => {
  console.log('listening port ' + PORT);
});

/*
    const data = fs.readFileSync('db.json', 'utf-8');
    const obj = JSON.parse(data);
    const UUID = crypto.randomUUID();

    obj.push({
      name: 'lox',
      age: Math.round(Math.random() * 30),
      UUID,
    });

    const stringify = JSON.stringify(obj);

    fs.writeFileSync('db.json', stringify);


  */
