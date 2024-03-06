const express = require('express')
const { print } = require("./example.js")
// import path from 'path'
// import { fileURLToPath } from 'url';

const app = express();
/* 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
*/
// app.use(express.static(path.join(__dirname, '/dist')));

app.get('/imprimir', (req, res) => print());
app.get('/', (req, res) => {
  res.send("Hola mundo, actualizacion 2");
});

const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor Express escuchando en el puerto ${puerto}`);
});
