const fs = require('fs');
const filePath = 'c:\\Users\\ROSIE\\Desktop\\Aureum_AI_Team\\zeromedical\\app.js';
let text = fs.readFileSync(filePath, 'utf8');

// 1. About page company name fallback
text = text.replace(
  "c.name || 'ゼロメディカル（ZERO MEDICAL）'",
  "c.name || 'ゼロメディカルジャパン（ZERO MEDICAL JAPAN）'"
);

// 2. About route description 
text = text.replace(
  'description: "ZERO MEDICALの会社情報',
  'description: "ZERO MEDICAL JAPANの会社情報'
);

// Final check
let pos = 0;
let count = 0;
while (true) {
  const idx = text.indexOf('ZERO MEDICAL', pos);
  if (idx === -1) break;
  if (text.substring(idx + 12, idx + 18) !== ' JAPAN') {
    const context = text.substring(Math.max(0, idx - 20), Math.min(text.length, idx + 50));
    console.log(`Still remaining at ${idx}: ...${context}...`);
    count++;
  }
  pos = idx + 1;
}
console.log(`Remaining standalone "ZERO MEDICAL": ${count}`);

fs.writeFileSync(filePath, text, 'utf8');
console.log('Done!');
