import { fileURLToPath } from 'url';
import crypto from 'node:crypto';
import { dirname } from 'path';
import express from 'express';
import fs from 'node:fs';

const __dirname = fileURLToPath(dirname(import.meta.url));

const app = express();
const PORT = 3001;

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send('<form method="post" action="/form"><input type="text"></input><button>redirect to form</button></form>');
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

app.listen(PORT, () => {
  console.log('listening port ' + PORT);
});

/*   if (req.url === '/form') {
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
    res.writeHead(200, { 'Content-Type': ' text/html' });
    res.write('<a href="/">BY DEFAULT</a>');
    res.end();
  } else {
    res.end('status error 404');
  }
}); */
