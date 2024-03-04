import { EscPos } from "@tillpos/xml-escpos-helper"
import fs from 'fs-extra'
import path from "path"
import net from "net"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tempalatePath = path.join(__dirname, './sample.xml')

function generateBuffer (template, data) {
  return EscPos.getBufferFromTemplate(template, data)
}

async function sendMessageToPrinter (host, port,message) {
  try {
    await connectToPrinter(host, port, message)
  } catch (err) {
    console.log(err)
  }
}

export async function print () {
  try {
    const template = fs.readFileSync(tempalatePath, {encoding: 'utf8'})

    const PRINTER = {
      host: "192.168.0.101",
      port: "9100"
    }

    const data = {
      title: 'Sample',
      date: '07-08-2001'
    };
    const message = generateBuffer(template, data)
    await sendMessageToPrinter(PRINTER.host, PRINTER.port, message)
  }catch(error){
    console.error('Error reading template file:', error)
  }
}

function connectToPrinter(host, port, buffer) {
  return new Promise((resolve, reject) => {
    const device = new net.Socket();

    device.on("close", () => {
      if (device) {
        device = null
      }
      resolve(true)
      return;
    })

    device.connect(port, host, () => {
      device.write(buffer);
      device.emit("close");
    });

    device.on('error', (error) => {
      console.error('Error al conectarse con la impresora térmica:', error);
    });
  })
}
