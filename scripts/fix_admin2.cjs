const fs = require('fs');
const filePath = 'c:\\Users\\ROSIE\\Desktop\\Aureum_AI_Team\\zeromedical\\admin.js';
let text = fs.readFileSync(filePath, 'utf8');

// Check for "ZERO MEDICAL" without JAPAN
let pos = 0;
let count = 0;
while (true) {
  const idx = text.indexOf('ZERO MEDICAL', pos);
  if (idx === -1) break;
  if (text.substring(idx + 12, idx + 18) !== ' JAPAN') {
    const context = text.substring(Math.max(0, idx - 30), Math.min(text.length, idx + 60));
    console.log(`At ${idx}: ...${context}...`);
    count++;
  }
  pos = idx + 1;
}
console.log(`\nTotal standalone "ZERO MEDICAL" in admin.js: ${count}`);

// Fix them
// 1. Comment header
text = text.replace(
  '// ZERO MEDICAL — Admin Panel',
  '// ZERO MEDICAL JAPAN — Admin Panel'
);

// Re-check
pos = 0; count = 0;
while (true) {
  const idx = text.indexOf('ZERO MEDICAL', pos);
  if (idx === -1) break;
  if (text.substring(idx + 12, idx + 18) !== ' JAPAN') {
    const context = text.substring(Math.max(0, idx - 20), Math.min(text.length, idx + 50));
    console.log(`Still at ${idx}: ...${context}...`);
    count++;
  }
  pos = idx + 1;
}
console.log(`After fix: ${count} remaining`);

fs.writeFileSync(filePath, text, 'utf8');
console.log('admin.js verified and fixed!');
