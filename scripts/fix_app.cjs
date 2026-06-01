// Node.js script to fix app.js
const fs = require('fs');

const filePath = 'c:\\Users\\ROSIE\\Desktop\\Aureum_AI_Team\\zeromedical\\app.js';
let text = fs.readFileSync(filePath, 'utf8');

console.log('Original length:', text.length);

// ============================================================
// FIX 1: Find and fix the broken region
// ============================================================

// The broken region starts with the truncated table row in jpImportPage
// Pattern: ["その他", "極細...", "ご要望に応じ(BROKEN TEXT)function jpCosmeticPage()...
const brokenMarker = '\u3054\u8981\u671b\u306b\u5fdc\u3058'; // "ご要望に応じ"
const brokenIdx = text.indexOf(brokenMarker);
console.log('Broken text at position:', brokenIdx);

// Find the start of this table row line
const rowLineStart = text.lastIndexOf('\n', brokenIdx) + 1;
// Actually we need to find the start of the ["その他" row
const sonoTaStart = text.lastIndexOf('["その他"', brokenIdx);
const sonoTaLineStart = text.lastIndexOf('\n', sonoTaStart) + 1;
console.log('その他 row starts at:', sonoTaLineStart);

// Find the second jpCosmeticPage (the t:aim version)
const firstCosmeticIdx = text.indexOf('function jpCosmeticPage');
const secondCosmeticIdx = text.indexOf('function jpCosmeticPage', firstCosmeticIdx + 1);
const marketingIdx = text.indexOf('function jpMarketingPage');

console.log('First jpCosmeticPage at:', firstCosmeticIdx);
console.log('Second jpCosmeticPage at:', secondCosmeticIdx);
console.log('jpMarketingPage at:', marketingIdx);

// The region to replace: from sonoTaLineStart to secondCosmeticIdx
// This encompasses:
//   - broken table row
//   - first jpCosmeticPage (broken inline)
//   - orphaned jpProductsPage code

const replacement1 = `            ["その他", "極細医療用針（34G等） / カニューレ / 施術サポート用備品", "ご要望に応じ、各種消耗品・備品を個別にお見積りいたします"]
          ]
        )}
      \`
    })}
    \${koreanConsultSection()}
    \${cta()}
  \`;
}

function jpProductsPage() {
  return \`
    \${hero({
      compact: true,
      eyebrow: (siteData.pages['/products'] || {}).eyebrow || "製品導入支援",
      title: formatHeroTitle((siteData.pages['/products'] || {}).title || "貴院に最適な\\n製品をご提案"),
      copy: (siteData.pages['/products'] || {}).copy || "患者層・立地・診療内容・予算を踏まえて分析し、最適な製品・施策をご提案いたします。"
    })}
    \${section({
      title: "薬機法に配慮した導入支援",
      children: \`<div class="notice">薬機法第68条の規定により、日本未承認医薬品の商品名・成分名・効能効果・価格等の広告は禁止されております。詳細はお問い合わせの上、個別にご案内いたします。</div>\`
    })}
    \${section({
      kicker: "ご提案方針",
      title: "ご提案の考え方",
      className: "tint",
      children: table(
        ["方針", "内容"],
        [
          ["個別提案", "患者層・立地・診療内容・予算を踏まえた実行可能なプラン"],
          ["競合分析と差別化戦略", "近隣競合と患者動向を踏まえた立ち位置づくり"],
          ["導入効果の見える化", "収益シミュレーションや導入スケジュールまで整理"]
        ]
      )
    })}
    \${section({
      kicker: "医療機器",
      title: "医療機器ラインナップ",
      children: \`
        \${mediaGrid([
          {
            type: "equipment",
            label: "プレミアムHIFU「LIFTERA 2」",
            caption: "患者様の満足度を高める非侵襲リフトアップ機器",
            src: "/assets/generated/equipment-demo.png"
          },
          {
            type: "model",
            label: "痛みに配慮した施術設計",
            caption: "ダウンタイムを最小限に抑えた最新の技術アプローチ",
            src: "/assets/generated/model-treatment.png"
          },
          {
            type: "trust",
            label: "臨床・デモンストレーション",
            caption: "専任インストラクターによる安全な操作レクチャーの提供",
            src: "/assets/generated/products-demo.png"
          }
        ])}
        \${table(
          ["機器名", "カテゴリ", "特徴"],
          [
            ["LIFTERA2", "次世代HIFU", "熱拡散治療（TDT™）/ デュアルタイプ非侵襲リフトアップ / 様々な深度対応"],
            ["COOL FASE", "モノポーラRF", "先端直接冷却（DCC™）/ 痛みに配慮した施術設計 / 独自技術"],
            ["EVE SYNERGE", "RF複合機器", "RF×EMS / RF×Microcurrentシナジーモード / 肌コンディションの改善をサポート"],
            ["LDM", "高密度超音波", "肌コンディションのケア / リフティングケア + 肌質管理"]
          ]
        )}
      \`
    })}
    \${section({
      kicker: "支援内容",
      title: "提案内容に含まれるもの",
      className: "tint",
      children: list([
        "製品や施術の選定理由",
        "市場・患者ニーズの傾向（データに基づく）",
        "施術単価・原価率・利益率のシミュレーション",
        "院内オペレーションへの影響と導入スケジュール",
        "スタッフ向け資料・患者説明ツールの別途作成も可能"
      ], "positive")
    })}
    \${koreanConsultSection()}
    \${cta()}
  \`;
}

`;

text = text.substring(0, sonoTaLineStart) + replacement1 + text.substring(secondCosmeticIdx);

console.log('After fix 1 length:', text.length);

// ============================================================
// FIX 2: Replace the remaining jpCosmeticPage (old t:aim version)
//         with the "準備中" version
// ============================================================

const cosmeticIdx = text.indexOf('function jpCosmeticPage');
const nextFuncIdx = text.indexOf('function jpMarketingPage');

console.log('Cosmetic function at:', cosmeticIdx);
console.log('Next function at:', nextFuncIdx);

const newCosmeticPage = `function jpCosmeticPage() {
  return \`
    \${hero({
      compact: true,
      eyebrow: (siteData.pages['/cosmetic'] || {}).eyebrow || "メディカルコスメ",
      title: formatHeroTitle((siteData.pages['/cosmetic'] || {}).title || "メディカルコスメ"),
      copy: (siteData.pages['/cosmetic'] || {}).copy || "ZERO MEDICAL JAPANでは、日本のメディカルビジネスに最適な韓国製高品質コスメの新規ラインナップを選定中でございます。"
    })}
    \${section({
      kicker: "準備中",
      title: "新規製品ラインナップ選定およびリニューアル中",
      lead: "現在、最新のトレンドを捉えた安全でプレミアムな韓国製メディカルコスメ製品の導入を準備しております。コスメ製品の導入をご検討の事業者様や、OEM/ODM、製品流通提携にご興味のある方は、下記よりお気軽にお問い合わせください。",
      children: \`
        <div class="notice" style="text-align: center; padding: 40px 20px; background: rgba(205, 178, 135, 0.08); border: 1px dashed var(--gold); border-radius: var(--radius);">
          <span style="font-size: 2.5rem; display: block; margin-bottom: 15px;">🛍️</span>
          <h3 style="font-size: 1.3rem; color: var(--navy); margin: 0 0 10px;">高品質メディカルコスメの調達・協業相談</h3>
          <p style="color: var(--muted); max-width: 600px; margin: 0 auto 20px; font-size: 0.95rem; line-height: 1.6;">
            ZERO MEDICAL JAPANの韓国現地ネットワークを通じて、貴社・貴院のコンセプトに最適な製品の探索や、バルクでの輸入相談、法適合手続きを一貫してサポートいたします。
          </p>
          <a class="button primary" href="/contact">提携・導入について相談する →</a>
        </div>
      \`
    })}
    \${section({
      title: "導入・提携のご相談",
      className: "tint",
      lead: "個別のブランド調達要望やバルク輸入取引のご相談は、お問い合わせ後に専任担当より丁寧にご案内いたします。",
      children: \`<a class="button dark" href="/contact">お問い合わせへ →</a>\`
    })}
  \`;
}

`;

text = text.substring(0, cosmeticIdx) + newCosmeticPage + text.substring(nextFuncIdx);

// ============================================================
// FIX 3: Update the /cosmetic route metadata
// ============================================================

text = text.replace(
  'title: "メディカルコスメ t:aim | ZERO MEDICAL"',
  'title: "メディカルコスメ | ZERO MEDICAL"'
);

// Check if the description references t:aim
const cosmeticDescIdx = text.indexOf('韓国発の高品質メディカルコスメ t:aim');
if (cosmeticDescIdx >= 0) {
  text = text.replace(
    '韓国発の高品質メディカルコスメ t:aim をご紹介',
    '韓国製高品質メディカルコスメの新規ラインナップを準備中です'
  );
}

// Also fix any route description that mentions t:aim for cosmetic
text = text.replace(
  /description:\s*"[^"]*t:aim[^"]*"/g,
  'description: "韓国製高品質メディカルコスメの新規ラインナップを準備中です。導入・提携のご相談を歓迎いたします。"'
);

console.log('Final length:', text.length);

// Verify no duplicate jpCosmeticPage
const firstIdx = text.indexOf('function jpCosmeticPage');
const secondIdx = text.indexOf('function jpCosmeticPage', firstIdx + 1);
console.log('jpCosmeticPage count check - first:', firstIdx, 'second:', secondIdx);

// Verify jpProductsPage exists
const prodIdx = text.indexOf('function jpProductsPage');
console.log('jpProductsPage exists at:', prodIdx);

fs.writeFileSync(filePath, text, 'utf8');
console.log('app.js updated successfully!');
