import net from 'net';

export async function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer()
      .once('error', () => resolve(false))
      .once('listening', () => {
        server.close();
        resolve(true);
      })
      .listen(port);
  });
}

export async function findFreePort(startPort, maxAttempts = 10, increment = 100) {
  let currentPort = startPort;
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    if (await isPortFree(currentPort)) {
      return currentPort;
    }
    currentPort += increment;
    attempts++;
  }
  
  throw new Error(`No available port found after ${maxAttempts} attempts`);
}
