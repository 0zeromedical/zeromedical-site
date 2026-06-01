const fs = require('fs');
const filePath = 'c:\\Users\\ROSIE\\Desktop\\Aureum_AI_Team\\zeromedical\\app.js';
let text = fs.readFileSync(filePath, 'utf8');

// Fix marketing page title
text = text.replace(
  '高めるクリニック集患支援',
  '高める集患・マーケティング支援'
);

fs.writeFileSync(filePath, text, 'utf8');
console.log('Fixed marketing page title in app.js');
