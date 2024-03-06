const { EscPos } = require("@tillpos/xml-escpos-helper")
const net = require("net")

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
    const template = `
<?xml version="1.0" encoding="UTF-8"?>
<document>
<align mode="center">
<text-line size="2:0">{{title}}</text-line>
</align>
<line-feed />

<align mode="right">
<text-line size="1:0">{{date}}</text-line>
</align>

<line-feed />

<paper-cut />
</document>
`
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
    let device = new net.Socket();

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
