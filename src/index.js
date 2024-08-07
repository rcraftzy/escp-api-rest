const express = require('express')
const { print } = require("./example.js")
const { exec } = require("child_process");

const app = express();

app.get('/imprimir', (req, res) => {
  const {ref} = req.body
  if (ref === 'refs/heads/main') {
  } else {
    res.status(200).send("No se requiere actualizacion.")
  }
  return print()
});
app.get('/', (req, res) => {
 const {ref} = req.body
  if (ref === 'refs/heads/main') {
    exec('echo "Hola"', (error) => {
      if (error) return res.status(500).send("Error interno en la actualizacion")
      res.status(200).send("Actualizado")
    })
} else {
    res.status(200).send("No se requiere actualizacion.")

  }
  return res.send("Hola mundo,test actualizacion 2");
});

const puerto = 3000;
app.listen(puerto, () => {
  console.log(`Servidor Express escuchando en el puerto ${puerto}`);
});
