// Simple Node.js server startup script
require('dotenv').config({ path: './server/.env' });

// Now start the TypeScript server
require('child_process').spawn('npx', ['tsx', 'watch', 'server/index.ts'], {
  stdio: 'inherit',
  env: { ...process.env }
});
