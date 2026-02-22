const fs = require('fs');  
const txt = fs.readFileSync('input.txt', 'utf8');  
console.log(Buffer.from(txt).toString('base64'));  
