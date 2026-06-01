const fs = require('fs');
const filePath = 'c:\\Users\\ROSIE\\Desktop\\Aureum_AI_Team\\zeromedical\\app.js';
let text = fs.readFileSync(filePath, 'utf8');

// Fix remaining ZERO MEDICAL (without JAPAN) references
// 1. Import page section title
text = text.replace(
  'ZERO MEDICALの輸入代行が選ばれる理由',
  'ZERO MEDICAL JAPANの輸入代行が選ばれる理由'
);

// 2. Admin route title (different pattern - "管理者パネル")
text = text.replace(
  'title: "管理者パネル | ZERO MEDICAL"',
  'title: "管理者パネル | ZERO MEDICAL JAPAN"'
);

// Check for any remaining standalone "ZERO MEDICAL" (without JAPAN following)
const remaining = text.match(/ZERO MEDICAL(?! JAPAN)/g);
console.log('Remaining "ZERO MEDICAL" without JAPAN:', remaining ? remaining.length : 0);
if (remaining) {
  // Find positions
  let pos = 0;
  let results = [];
  while (true) {
    const idx = text.indexOf('ZERO MEDICAL', pos);
    if (idx === -1) break;
    // Check if followed by " JAPAN"
    if (text.substring(idx + 12, idx + 18) !== ' JAPAN') {
      const context = text.substring(Math.max(0, idx - 20), Math.min(text.length, idx + 50));
      results.push(`Position ${idx}: ...${context}...`);
    }
    pos = idx + 1;
  }
  results.forEach(r => console.log('  ', r));
}

fs.writeFileSync(filePath, text, 'utf8');
console.log('Done!');
