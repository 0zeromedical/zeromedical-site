// Node.js script to fix remaining clinic references in app.js
const fs = require('fs');

const filePath = 'c:\\Users\\ROSIE\\Desktop\\Aureum_AI_Team\\zeromedical\\app.js';
let text = fs.readFileSync(filePath, 'utf8');

console.log('Original length:', text.length);

// FIX 1: Top page - "日本のクリニック運営を支える5つのサービス" -> "日本のメディカルビジネスを支える5つのサービス"
text = text.replace(
  '日本のクリニック運営を支える5つのサービス',
  '日本のメディカルビジネスを支える5つのサービス'
);
console.log('Fix 1 done');

// FIX 2: "クリニック経営の課題に寄り添い" -> "メディカルビジネスの課題に寄り添い"
text = text.replace(
  'クリニック経営の課題に寄り添い',
  'メディカルビジネスの課題に寄り添い'
);
console.log('Fix 2 done');

// FIX 3: Marketing page - "クリニック経営を包括的に支援" -> "メディカルビジネスを包括的に支援"
text = text.replace(
  'クリニック経営を包括的に支援',
  'メディカルビジネスを包括的に支援'
);
console.log('Fix 3 done');

// FIX 4: About page - "日本のクリニック経営に必要な" -> "日本のメディカルビジネスに必要な"
text = text.replace(
  '日本のクリニック経営に必要な',
  '日本のメディカルビジネスに必要な'
);
console.log('Fix 4 done');

// Verify no more references
const remainingClinic = text.match(/クリニック(?:経営|運営)/g);
console.log('Remaining クリニック経営/運営 references:', remainingClinic ? remainingClinic.length : 0);

// Also check for "クリニック集患支援" in routes/business descriptions 
const clinicSyuukan = text.match(/クリニック集患支援/g);
console.log('Remaining クリニック集患支援:', clinicSyuukan ? clinicSyuukan.length : 0);

// Note: We don't change "クリニック" when it refers to the actual clinic as a customer
// e.g. "クリニックでの導入" (introduction at clinic) is fine
// e.g. "クリニック専売" (clinic exclusive) is fine  

console.log('Final length:', text.length);
fs.writeFileSync(filePath, text, 'utf8');
console.log('app.js clinic references updated!');
