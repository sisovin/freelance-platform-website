import fs from 'fs';
import { spawn } from 'child_process';
import os from 'os';

// Create an empty server-urls.txt file if it doesn't exist
if (!fs.existsSync('server-urls.txt')) {
  fs.writeFileSync('server-urls.txt', '');
}

console.log('Waiting for server to start...');

// Helper function to get network interfaces and write to file
function updateServerUrls() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push(iface.address);
      }
    }
  }
  
  const port = 3001;
  let content = `http://localhost:${port}/\n`;
  addresses.forEach(ip => {
    content += `http://${ip}:${port}/\n`;
  });
  
  fs.writeFileSync('server-urls.txt', content);
  
  // Run the show-urls script
  const child = spawn('node', ['./scripts/show-urls.js'], { stdio: 'inherit' });
}

// Update initially and then watch for changes
updateServerUrls();

// Also poll periodically to update
setInterval(updateServerUrls, 10000);