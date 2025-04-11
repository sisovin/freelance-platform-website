import os from 'os';
import chalk from 'chalk';

// Helper function to get network interfaces
function getNetworkInterfaces() {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push(iface.address);
      }
    }
  }
  
  return addresses;
}

const port = 3001;
const networkInterfaces = getNetworkInterfaces();

console.log('\n' + chalk.green('🚀 RSBuild Server URLs:') + '\n');
console.log(chalk.cyan(`➜  Local:   http://localhost:${port}/`));
networkInterfaces.forEach(ip => {
  console.log(chalk.cyan(`➜  Network: http://${ip}:${port}/`));
});
console.log('\n');