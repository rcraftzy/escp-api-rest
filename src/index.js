import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { print } from "./example.js"

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '/dist')));

app.get('/imprimir', (req, res) => print());
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor Express escuchando en el puerto ${puerto}`);
});
