// Node.js script to fix index.html
const fs = require('fs');

const filePath = 'c:\\Users\\ROSIE\\Desktop\\Aureum_AI_Team\\zeromedical\\index.html';
let text = fs.readFileSync(filePath, 'utf8');

// FIX 1: Update meta description - replace クリニック向け -> メディカルビジネス向け
text = text.replace(
  'ZERO MEDICALは、日本のクリニック向けに韓国製品調達、製品導入支援、集患支援、会場レンタルを行う日本法人サイトです。',
  'ZERO MEDICAL JAPANは、日本のメディカルビジネス向けに韓国製品調達、製品導入支援、集患・マーケティング支援、会場レンタルを行う日本法人サイトです。'
);

// FIX 2: Update keywords - add ジャパン, update terms
text = text.replace(
  'ZERO MEDICAL, ゼロメディカル, 韓国製医薬品, 輸入代行, 製品導入支援, メディカルコスメ, 集患支援, 会場レンタル, クリニック経営',
  'ZERO MEDICAL JAPAN, ゼロメディカルジャパン, 韓国製医薬品, 輸入代行, 製品導入支援, メディカルコスメ, 集患・マーケティング支援, 会場レンタル, 日韓医療ビジネス'
);

// FIX 3: Update author
text = text.replace(
  'content="ZERO MEDICAL"',
  'content="ZERO MEDICAL JAPAN"'
);

// FIX 4: Update OG title
text = text.replace(
  'content="ZERO MEDICAL 日本法人"',
  'content="ZERO MEDICAL JAPAN｜日韓医療ビジネスパートナー"'
);

// FIX 5: Update page title
text = text.replace(
  '<title>ZERO MEDICAL 日本法人</title>',
  '<title>ZERO MEDICAL JAPAN｜日韓医療ビジネスパートナー</title>'
);

fs.writeFileSync(filePath, text, 'utf8');
console.log('index.html updated successfully!');
