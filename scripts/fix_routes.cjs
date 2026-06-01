const fs = require('fs');
const filePath = 'c:\\Users\\ROSIE\\Desktop\\Aureum_AI_Team\\zeromedical\\app.js';
let text = fs.readFileSync(filePath, 'utf8');

// Fix route titles to include JAPAN
// TOP route
text = text.replace(
  'title: "ZERO MEDICAL | 日韓医療ビジネスパートナー"',
  'title: "ZERO MEDICAL JAPAN | 日韓医療ビジネスパートナー"'
);

// Import route
text = text.replace(
  'title: "輸入代行 | ZERO MEDICAL"',
  'title: "輸入代行 | ZERO MEDICAL JAPAN"'
);

// Products route
text = text.replace(
  'title: "製品導入支援 | ZERO MEDICAL"',
  'title: "製品導入支援 | ZERO MEDICAL JAPAN"'
);

// Cosmetic route
text = text.replace(
  'title: "メディカルコスメ | ZERO MEDICAL"',
  'title: "メディカルコスメ | ZERO MEDICAL JAPAN"'
);

// Marketing route - fix title label too
text = text.replace(
  'title: "集患支援 | ZERO MEDICAL"',
  'title: "集患・マーケティング支援 | ZERO MEDICAL JAPAN"'
);

// Space route
text = text.replace(
  'title: "会場レンタル | ZERO MEDICAL"',
  'title: "会場レンタル | ZERO MEDICAL JAPAN"'
);

// About route
text = text.replace(
  'title: "会社概要 | ZERO MEDICAL"',
  'title: "会社概要 | ZERO MEDICAL JAPAN"'
);

// Contact route
text = text.replace(
  'title: "お問い合わせ | ZERO MEDICAL"',
  'title: "お問い合わせ | ZERO MEDICAL JAPAN"'
);

// Admin route
text = text.replace(
  'title: "管理パネル | ZERO MEDICAL"',
  'title: "管理パネル | ZERO MEDICAL JAPAN"'
);

// Privacy route (if exists)
text = text.replace(
  'title: "プライバシーポリシー | ZERO MEDICAL"',
  'title: "プライバシーポリシー | ZERO MEDICAL JAPAN"'
);

// 404 page
text = text.replace(
  'title: "ページが見つかりません | ZERO MEDICAL"',
  'title: "ページが見つかりません | ZERO MEDICAL JAPAN"'
);

// Also fix marketing description that references 美容クリニック -> メディカルビジネス  
text = text.replace(
  '美容クリニックの集患とブランド戦略を包括支援',
  'メディカルビジネスの集患とブランド戦略を包括支援'
);

// Fix the footer Copyright
text = text.replace(
  'Copyright © ZERO MEDICAL JAPAN',
  'Copyright © ZERO MEDICAL JAPAN'  // This is already correct
);

// Verify all route titles
const routeMatches = text.match(/title:\s*"[^"]*ZERO MEDICAL[^"]*"/g);
console.log('All route titles with ZERO MEDICAL:');
routeMatches?.forEach(m => console.log('  ', m));

fs.writeFileSync(filePath, text, 'utf8');
console.log('\napp.js route titles updated!');
