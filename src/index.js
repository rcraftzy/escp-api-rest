const express = require('express')
const { print } = require("./example.js")

const app = express();

app.get('/imprimir', (req, res) => {
  const {ref} = req.body
  if (ref === 'refs/heads/main') {
    exec('git pull && npm install && pm2 restart api', (error) => {
      if (error) return res.status(500).send("Error interno en la actualizacion")
      res.status(200).send("Actualizado")
    })
  } else {
    res.status(200).send("No se requiere actualizacion.")

  }
  return print()
});
app.get('/', (req, res) => {
  res.send("Hola mundo, actualizacion 4");
});

const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor Express escuchando en el puerto ${puerto}`);
});
