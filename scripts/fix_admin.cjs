// Node.js script to fix admin.js
const fs = require('fs');

const filePath = 'c:\\Users\\ROSIE\\Desktop\\Aureum_AI_Team\\zeromedical\\admin.js';
let text = fs.readFileSync(filePath, 'utf8');

console.log('Original length:', text.length);

// FIX 1: Update company name
text = text.replace(
  'name: "ゼロメディカル（ZERO MEDICAL）"',
  'name: "ゼロメディカルジャパン（ZERO MEDICAL JAPAN）"'
);
console.log('Fix 1 done: company name');

// FIX 2: Update nav order and labels
// Current nav order: TOP, import, products, cosmetic, marketing, space, about, contact
// Target order: TOP, import, products, marketing, space, cosmetic, about, contact
// Also: marketing label "集患支援" -> "集患・マーケティング支援"

const oldNav = `nav: [
    { href: "/", label: "TOP", visible: true },
    { href: "/import", label: "輸入代行", visible: true },
    { href: "/products", label: "製品導入支援", visible: true },
    { href: "/cosmetic", label: "メディカルコスメ", visible: true },
    { href: "/marketing", label: "集患支援", visible: true },
    { href: "/space", label: "会場レンタル", visible: true },
    { href: "/about", label: "会社概要", visible: true },
    { href: "/contact", label: "お問い合わせ", visible: true }
  ]`;

const newNav = `nav: [
    { href: "/", label: "TOP", visible: true },
    { href: "/import", label: "輸入代行", visible: true },
    { href: "/products", label: "製品導入支援", visible: true },
    { href: "/marketing", label: "集患・マーケティング支援", visible: true },
    { href: "/space", label: "会場レンタル", visible: true },
    { href: "/cosmetic", label: "メディカルコスメ", visible: true },
    { href: "/about", label: "会社概要", visible: true },
    { href: "/contact", label: "お問い合わせ", visible: true }
  ]`;

text = text.replace(oldNav, newNav);
console.log('Fix 2 done: nav order and labels');

// FIX 3: Update cosmetic page copy (remove t:aim references)
text = text.replace(
  `"/cosmetic": {
      eyebrow: "メディカルコスメ",
      title: "韓国発メディカルコスメ、\\nt:aim",
      copy: "施術後のホームケアから院内物販まで、クリニックでの導入に最適なメディカルコスメをご紹介いたします。"
    }`,
  `"/cosmetic": {
      eyebrow: "メディカルコスメ",
      title: "メディカルコスメ",
      copy: "ZERO MEDICAL JAPANでは、日本のメディカルビジネスに最適な韓国製高品質コスメの新規ラインナップを選定中でございます。"
    }`
);
console.log('Fix 3 done: cosmetic page copy');

// FIX 4: Update marketing page eyebrow and title if needed
text = text.replace(
  `"/marketing": {
      eyebrow: "集患支援",
      title: "集患・売上・ブランド力を\\n高めるクリニック集患支援",`,
  `"/marketing": {
      eyebrow: "集患・マーケティング支援",
      title: "集患・売上・ブランド力を\\n高める集患・マーケティング支援",`
);
console.log('Fix 4 done: marketing eyebrow and title');

// FIX 5: Update business description to remove クリニック集患支援 -> 集患・マーケティング支援
text = text.replace(
  'クリニック集患支援',
  '集患・マーケティング支援'
);
console.log('Fix 5 done: business description');

// FIX 6: Update about page copy - replace クリニック運営 style references
// "日本のクリニック経営に必要な" -> "日本のメディカルビジネスに必要な"
text = text.replace(
  '日本のクリニック経営に必要な',
  '日本のメディカルビジネスに必要な'
);
console.log('Fix 6 done: about page copy');

// FIX 7: Update marketing page copy - replace クリニック経営 -> メディカルビジネス
text = text.replace(
  'クリニック経営を包括的に支援',
  'メディカルビジネスを包括的に支援'
);
console.log('Fix 7 done: marketing copy');

console.log('Final length:', text.length);

fs.writeFileSync(filePath, text, 'utf8');
console.log('admin.js updated successfully!');
