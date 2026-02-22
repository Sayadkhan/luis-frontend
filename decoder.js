const fs = require('fs');  
const b64 = process.argv[2];  
const content = Buffer.from(b64, 'base64').toString('utf8');  
fs.writeFileSync('app/add-club/page.tsx', content);  
console.log('Done');  
