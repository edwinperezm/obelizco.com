import { findFreePort } from './get-port.js';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function setupPorts() {
  try {
    // Find available ports
    const frontendPort = await findFreePort(3000, 10, 100);
    const backendPort = await findFreePort(4000, 10, 100);
    
    // Update .env file
    const envPath = join(__dirname, '../.env');
    let envContent = '';
    
    if (existsSync(envPath)) {
      envContent = readFileSync(envPath, 'utf8');
    }
    
    // Update or add port settings
    const updates = {
      'FRONTEND_PORT': frontendPort,
      'BACKEND_PORT': backendPort,
      'VITE_API_URL': `http://localhost:${backendPort}/api`
    };
    
    Object.entries(updates).forEach(([key, value]) => {
      const regex = new RegExp(`^${key}=.*`, 'm');
      const setting = `${key}=${value}`;
      
      if (regex.test(envContent)) {
        envContent = envContent.replace(regex, setting);
      } else {
        envContent += `\n${setting}\n`;
      }
    });
    
    writeFileSync(envPath, envContent.trim() + '\n');
    
    // Set environment variables for the current process
    process.env.FRONTEND_PORT = frontendPort.toString();
    process.env.BACKEND_PORT = backendPort.toString();
    process.env.VITE_API_URL = `http://localhost:${backendPort}/api`;
    
    // Output for npm script
    console.log(`FRONTEND_PORT=${frontendPort}`);
    console.log(`BACKEND_PORT=${backendPort}`);
    
  } catch (error) {
    console.error('Error setting up ports:', error);
    process.exit(1);
  }
}

await setupPorts();
