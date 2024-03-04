import net from 'net'

export function connectToPrinter(host, port, buffer) {
  return new Promise((resolve, reject) => {
    const device = new net.Socket();

    device.on("close", () => {
      if (device) {
        device.destroy()
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
