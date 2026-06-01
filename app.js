const contact = {
  jp: {
    tel: "090-3228-9502",
    hours: "",
    line: "",
    email: "0zero.medical@gmail.com",
    siteUrl: "https://zeromedical.jp"
  }
};

const jpNav = [
  ["/", "TOP"],
  ["/import", "輸入代行"],
  ["/products", "製品導入支援"],
  ["/marketing", "マーケティング支援"],
  ["/space", "会場レンタル"],
  ["/about", "会社概要"],
  ["/contact", "お問い合わせ"]
];

const siteData = {
  company: {
    name: "ZERO MEDICAL JAPAN",
    siteUrl: "https://zeromedical.jp",
    registrantName: "盧 在薫",
    registrantRoman: "JAEHOON NO",
    registrationContact: "盧 在薫",
    registrationDepartment: "",
    postalCode: "174-0046",
    prefecture: "東京都",
    address: "板橋区蓮根2-30 16-710",
    representative: "盧 在薫（JAEHOON NO）",
    established: "",
    capital: "",
    bank: "",
    tel: "090-3228-9502",
    hours: "",
    fax: "",
    email: "0zero.medical@gmail.com",
    line: "",
    languages: "日本語・韓国語",
    business: "韓国製医薬品・製品の輸入代行 / 医療機器・製品導入支援 / メディカルコスメ販売 / マーケティング支援 / 会場レンタル"
  },
  nav: jpNav.map(([href, label]) => ({ href, label, visible: true })),
  pages: {}
};

const jpServices = [
  {
    href: "/import",
    title: "輸入代行",
    text: "韓国製医薬品・化粧品の輸入手続きをワンストップでサポート",
    media: {
      type: "product",
      label: "確かな物流品質",
      caption: "厳格な品質管理基準を満たした韓国製医薬品の正規輸送",
      src: "/assets/generated/service-import.png"
    }
  },
  {
    href: "/products",
    title: "製品導入支援",
    text: "メディカル事業者様のニーズに適した韓国製医療機器・製品をご提案",
    media: {
      type: "equipment",
      label: "最先端医療機器の選定",
      caption: "臨床効果と安全性が確認された最新の医療ソリューション",
      src: "/assets/generated/service-products.png"
    }
  },
  {
    href: "/marketing",
    title: "マーケティング支援",
    text: "Web・SNS・LINEを活用し、認知向上とブランドづくりを支援",
    media: {
      type: "marketing",
      label: "一貫したマーケティングサポート",
      caption: "ブランディングからリピート獲得まで設計されたWeb戦略",
      src: "/assets/generated/service-marketing.png"
    }
  },
  {
    href: "/space",
    title: "会場レンタル",
    text: "大阪・東京で商談会・相談会向けの会場をご用意",
    media: {
      type: "venue",
      label: "東京・大阪の商談会場",
      caption: "実物デモや個別カウンセリングに最適なプライベート空間",
      src: "/assets/generated/service-space.png"
    }
  }
];

const jpReasons = [
  ["韓国現地ネットワーク", "製造元・サプライヤーとの直接取引による安定供給"],
  ["適正価格でのご提案", "中間マージンを排除し、導入コストを最適化"],
  ["煩雑な手続きを一括代行", "輸入確認申請・通関・現地手配まで弊社が対応"],
  ["日韓バイリンガル対応", "日本語・韓国語による円滑なコミュニケーション"]
];

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizePath(pathname = window.location.pathname) {
  const cleaned = pathname.replace(/\/+$/, "");
  return cleaned || "/";
}

function navFor(lang) {
  return (siteData.nav || jpNav).filter(function (item) {
    return item.visible !== false;
  });
}

function getLogoVariant() {
  const requested = new URLSearchParams(window.location.search).get("logo");
  return ["soft", "tech", "bold"].includes(requested) ? requested : "soft";
}

function header(lang, activePath) {
  const nav = navFor(lang);
  const currentPath = activePath;
  const logoVariant = getLogoVariant();
  return `
    <header class="site-header">
      <div class="header-inner">
        <a class="brand logo-${logoVariant}" href="/" aria-label="ZERO MEDICAL JP home">
          <span class="brand-symbol" aria-hidden="true">
            <span>ZE</span>
            <span>RO</span>
          </span>
          <span class="brand-text">
            <span class="brand-wordmark"><span class="brand-word-zero">ZERO</span><span class="brand-word-medical">MEDICAL</span><span class="brand-word-jp">JP</span></span>
            <span class="brand-kana">ゼロメディカル｜日韓医療ビジネスパートナー</span>
          </span>
        </a>
        <button class="menu-toggle" type="button" aria-label="メニューを開く" aria-expanded="false" aria-controls="site-nav">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav class="nav" id="site-nav" aria-label="主要メニュー">
          ${nav
            .map(
              (item) => {
                const href = item.href || item[0];
                const label = item.label || item[1];
                return `<a href="${href}" class="${currentPath === href ? "active" : ""}">${label}</a>`;
              }
            )
            .join("")}
        </nav>
      </div>
    </header>
  `;
}

function footer(lang) {
  const c = (typeof siteData !== 'undefined' && siteData.company) ? siteData.company : contact.jp;
  const companyShort = (c.name || 'ZERO MEDICAL JAPAN').split('（')[0];
  const siteUrl = c.siteUrl || contact.jp.siteUrl;
  const details = [
    `会社名: ${esc(companyShort)}`,
    c.tel ? `TEL: <span class="placeholder">${esc(c.tel)}</span>` : "",
    c.email ? `Email: <span class="placeholder">${esc(c.email)}</span>` : "",
    siteUrl ? `Web: <a href="${esc(siteUrl)}" target="_blank" rel="noopener">${esc(formatSiteHost(siteUrl))}</a>` : ""
  ].filter(Boolean).join(" · ");

  return `
    <footer class="site-footer">
      <div class="footer-inner">
        <div>
          <a class="brand footer-brand logo-soft" href="/" aria-label="ZERO MEDICAL JP home">
            <span class="brand-symbol" aria-hidden="true">
              <span>ZE</span>
              <span>RO</span>
            </span>
            <span class="brand-text">
              <span class="brand-wordmark"><span class="brand-word-zero">ZERO</span><span class="brand-word-medical">MEDICAL</span><span class="brand-word-jp">JP</span></span>
              <span class="brand-kana">ゼロメディカル｜日韓医療ビジネスパートナー</span>
            </span>
          </a>
          <p>${details}</p>
          <p>Copyright © ZERO MEDICAL JAPAN</p>
        </div>
        <div class="footer-links">
          <a href="/">TOP</a>
          <a href="/contact">お問い合わせ</a>
        </div>
      </div>
    </footer>
  `;
}

function formatSiteHost(url) {
  return String(url || "").replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function contactListMarkup(c, keys) {
  const labels = {
    tel: "TEL",
    line: "LINE",
    email: "Email",
    siteUrl: "Web"
  };

  return keys
    .map((key) => {
      const value = c && c[key];
      if (!value) return "";
      const body = key === "siteUrl"
        ? `<a href="${esc(value)}" target="_blank" rel="noopener">${esc(formatSiteHost(value))}</a>`
        : `<span class="placeholder">${esc(value)}</span>`;
      return `<li>${labels[key]}: ${body}</li>`;
    })
    .filter(Boolean)
    .join("");
}

function hero({ eyebrow, title, copy, compact = false, actions = "" }) {
  return `
    <section class="hero ${compact ? "compact" : ""}">
      <div class="container">
        <div class="hero-content">
          <p class="eyebrow">${eyebrow}</p>
          <h1>${title}</h1>
          <p class="hero-copy">${copy}</p>
          ${actions ? `<div class="hero-actions">${actions}</div>` : ""}
        </div>
      </div>
    </section>
  `;
}

function section({ kicker = "", title, lead = "", className = "", children }) {
  return `
    <section class="section ${className}">
      <div class="container">
        <div class="section-header">
          ${kicker ? `<p class="section-kicker">${kicker}</p>` : ""}
          <h2>${title}</h2>
          ${lead ? `<p class="section-lead">${lead}</p>` : ""}
        </div>
        ${children}
      </div>
    </section>
  `;
}

const imageDefaults = {
  clinic: "/assets/generated/clinic-consultation.png",
  product: "/assets/generated/product-display.png",
  model: "/assets/generated/model-treatment.png",
  equipment: "/assets/generated/equipment-demo.png",
  marketing: "/assets/generated/marketing-dashboard.png",
  venue: "/assets/generated/venue-room.png",
  trust: "/assets/generated/trust-team.png",
  qr: "/assets/generated/line-qr-placeholder.png"
};

function imageSlot({ type = "clinic", label, caption = "", ratio = "wide", src = "" }) {
  const variants = ["clinic", "product", "model", "equipment", "marketing", "venue", "trust", "qr"];
  const variant = variants.includes(type) ? type : "clinic";
  const finalSrc = src || imageDefaults[variant];

  return `
    <div class="image-slot ${variant} ${ratio}" role="img" aria-label="${esc(label)}" style="position: relative;">
      ${finalSrc ? `<img src="${finalSrc}" alt="" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />` : ""}
      <div class="image-error" style="display:none; position:absolute; inset:0; background:rgba(215, 206, 188, 0.95); flex-direction:column; align-items:center; justify-content:center; color:var(--danger); font-size:0.8rem; font-weight:bold; z-index:5; text-align:center; padding:10px; border-radius:var(--radius); border:1px dashed var(--danger);">
        <span style="font-size: 1.5rem; margin-bottom: 5px;">⚠️</span>
        <span>이미지 로드 실패<br/>(Image Load Error)</span>
      </div>
      ${finalSrc ? "" : `
        <div class="image-slot-art" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="image-slot-copy">
          <strong>${esc(label)}</strong>
          ${caption ? `<small>${esc(caption)}</small>` : ""}
        </div>
      `}
    </div>
  `;
}

function mediaGrid(items) {
  return `
    <div class="media-grid">
      ${items
        .map(
          (item) => `
          <article class="media-card">
            ${imageSlot(item)}
          </article>
        `
        )
        .join("")}
    </div>
  `;
}

function cards(items, options = {}) {
  const className = options.five ? "cards-grid five" : "cards-grid";
  return `
    <div class="${className}">
      ${items
        .map(
          (item, index) => `
          <article class="card">
            ${item.media ? imageSlot({ ...item.media, ratio: "card" }) : ""}
            <span class="card-index">${String(index + 1).padStart(2, "0")}</span>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
            ${item.href ? `<a class="card-link" href="${item.href}">${options.linkLabel || "詳細へ"} →</a>` : ""}
          </article>
        `
        )
        .join("")}
    </div>
  `;
}

function reasons(items) {
  return `
    <div class="reason-grid">
      ${items
        .map(
          ([title, text]) => `
          <div class="reason-item">
            <h3>${title}</h3>
            <p>${text}</p>
          </div>
        `
        )
        .join("")}
    </div>
  `;
}

function list(items, type = "positive") {
  return `
    <ul class="list-panel ${type}">
      ${items.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;
}

function table(headers, rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>${headers.map((headerText) => `<th>${headerText}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (row) => `
              <tr>${row.map((cell, index) => `<td data-label="${esc(headers[index] || "")}">${cell}</td>`).join("")}</tr>
            `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function flow(steps) {
  return `
    <div class="flow">
      ${steps.map((step) => `<div class="flow-step">${step}</div>`).join("")}
    </div>
  `;
}

function faq(items, fallback) {
  return `
    <div class="faq-list">
      ${items
        .map(
          (question) => `
          <details>
            <summary>${question}</summary>
            <p>${fallback}</p>
          </details>
        `
        )
        .join("")}
    </div>
  `;
}

function cta() {
  const c = (typeof siteData !== 'undefined' && siteData.company) ? siteData.company : contact.jp;
  return `
    <section class="section soft">
      <div class="container">
        <div class="cta-band">
          <div>
            <h2>まずはお気軽にご相談ください</h2>
            <p>貴院の課題やご要望を伺い、最適な導入プランをご提案いたします。</p>
          </div>
          <ul class="contact-list">
            ${contactListMarkup(c, ["tel", "email", "siteUrl"])}
          </ul>
        </div>
      </div>
    </section>
  `;
}

function koreanConsultSection() {
  return section({
    kicker: "한국어 상담",
    title: "한국어 상담 안내",
    lead: "한국 기업 및 한국 원장님을 위한 상담도 일본 법인 창구에서 도와드립니다.",
    className: "tint",
    children: `
      <div class="korean-note">
        <h3>한국 기업·원장님께</h3>
        <p>일본 개원 지원, 일본 시장 진출, 일본 클리닉 납품·유통, 마케팅, 현지 상담회·미팅 공간 이용은 한국어로 상담 가능합니다.</p>
        <p>별도 한국어 페이지는 운영하지 않습니다. 아래 문의 폼으로 한국어 문의를 남겨 주세요.</p>
        <a class="button dark" href="/contact">한국어로 문의하기 →</a>
      </div>
    `
  });
}

function productList(items) {
  return `
    <div class="product-list">
      ${items
        .map(
          ([title, text, media]) => `
          <article class="product-item">
            ${media ? imageSlot({ ...media, ratio: "tile" }) : ""}
            <h3>${title}</h3>
            <p>${text}</p>
          </article>
        `
        )
        .join("")}
    </div>
  `;
}

function jpTopPage() {
  return `
    ${hero({
      eyebrow: (siteData.pages['/'] || {}).eyebrow || "日本法人",
      title: formatHeroTitle((siteData.pages['/'] || {}).title || "日韓医療ビジネスを、\nゼロからサポートします。"),
      copy: (siteData.pages['/'] || {}).copy || "韓国の先進的な医療技術と製品で、貴院の競争力を強化します。",
      actions: `<a class="button primary" href="/contact">無料相談はこちら →</a><a class="button secondary" href="/import">輸入代行について →</a>`
    })}
    ${section({
      kicker: "サービス",
      title: "日本のメディカルビジネスを支える4つのサービス",
      lead: "韓国製品の調達から製品導入、マーケティング支援、会場手配まで一貫して支援します。",
      children: cards(jpServices, { five: true, linkLabel: "詳しく見る" })
    })}
    ${section({
      kicker: "信頼の裏付け",
      title: "確かな実績と信頼の体制",
      lead: "日本法人の専任スタッフが、貴院のビジネスを責任を持ってサポートいたします。",
      className: "soft",
      children: mediaGrid([
        {
          type: "trust",
          label: "日韓両国の専任チーム",
          caption: "言語や規制の壁を超えて、貴院のビジネスを強力に支援します",
          src: "/assets/generated/trust-team.png"
        },
        {
          type: "clinic",
          label: "個別導入カウンセリング",
          caption: "メディカルビジネスの課題に寄り添い、最適なロードマップをご提案",
          src: "/assets/generated/clinic-consultation.png"
        },
        {
          type: "product",
          label: "安心の国内出荷体制",
          caption: "ソウル・東京でのダブル検品体制で安全な配送を徹底",
          src: "/assets/generated/product-display.png"
        }
      ])
    })}
    ${section({
      kicker: "選ばれる理由",
      title: "選ばれる理由",
      className: "tint",
      children: reasons(jpReasons)
    })}
    ${koreanConsultSection()}
    ${cta()}
  `;
}

function jpImportPage() {
  return `
    ${hero({
      compact: true,
      eyebrow: (siteData.pages['/import'] || {}).eyebrow || "輸入代行",
      title: formatHeroTitle((siteData.pages['/import'] || {}).title || "韓国製医薬品の輸入手続きを、\n適正かつスムーズに。"),
      copy: (siteData.pages['/import'] || {}).copy || "韓国製医薬品・製品の輸入代行を承ります。煩雑な申請・通関手続きは弊社が一括で対応いたします。"
    })}
    ${section({
      kicker: "お悩み",
      title: "こんなお悩みはありませんか？",
      children: list([
        "韓国製の薬剤を導入したいが、輸入手続きが分からない",
        "輸入確認申請（旧・薬監証明）の対応が大変",
        "信頼できる仕入れルートが見つからない",
        "価格が高く、クリニックの収益を圧迫している"
      ], "negative")
    })}
    ${section({
      kicker: "強み",
      title: "ZERO MEDICAL JAPANの輸入代行が選ばれる理由",
      className: "tint",
      children: list([
        "中間マージンを抑えた価格設定",
        "輸入確認申請・通関手続きを一括サポート",
        "韓国現地ネットワークによる安定仕入れ",
        "小ロットやスポット発注にも対応",
        "正規ルートによる安全・確実な調達"
      ], "positive")
    })}
    ${section({
      kicker: "取扱カテゴリ",
      title: "取扱製品カテゴリ",
      children: `
        ${mediaGrid([
          {
            type: "product",
            label: "厳選された美容医薬品",
            caption: "韓国正規サプライヤーから調達した無菌パッケージ",
            src: "/assets/generated/import-package.png"
          },
          {
            type: "trust",
            label: "徹底した薬事適合チェック",
            caption: "専門家による成分とロットの国内通関前検査",
            src: "/assets/generated/import-clearance.png"
          },
          {
            type: "clinic",
            label: "迅速な院内納品サービス",
            caption: "温度管理を維持したコールドチェーンでお手元までお届け",
            src: "/assets/generated/import-delivery.png"
          }
        ])}
        ${table(
          ["カテゴリ", "代表製品例", "特徴"],
          [
            ["ボツリヌストキシン製剤", "リリブ（Lilyv） / コアトックス / ボツラックス", "高純度・高品質な韓国製トキシン製剤"],
            ["フィラー", "ニューラミス / チャウム 各種ヒアルロン酸フィラー", "信頼性の高い大手メーカー製ヒアルロン酸"],
            ["スキンケア化粧品", "t:aim メディカルスキンケア / 各種スキンブースター", "クリニック専売の高保湿・肌再生スキンケア"],
            ["その他", "極細医療用針（34G等） / カニューレ / 施術サポート用備品", "ご要望に応じ、各種消耗品・備品を個別にお見積りいたします"]
          ]
        )}
      `
    })}
    ${koreanConsultSection()}
    ${cta()}
  `;
}

function jpProductsPage() {
  return `
    ${hero({
      compact: true,
      eyebrow: (siteData.pages['/products'] || {}).eyebrow || "製品導入支援",
      title: formatHeroTitle((siteData.pages['/products'] || {}).title || "貴院に最適な\n製品をご提案"),
      copy: (siteData.pages['/products'] || {}).copy || "患者層・立地・診療内容・予算を踏まえて分析し、最適な製品・施策をご提案いたします。"
    })}
    ${section({
      title: "薬機法に配慮した導入支援",
      children: `<div class="notice">薬機法第68条の規定により、日本未承認医薬品の商品名・成分名・効能効果・価格等の広告は禁止されております。詳細はお問い合わせの上、個別にご案内いたします。</div>`
    })}
    ${section({
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
    ${section({
      kicker: "医療機器",
      title: "医療機器ラインナップ",
      children: `
        ${mediaGrid([
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
        ${table(
          ["機器名", "カテゴリ", "特徴"],
          [
            ["LIFTERA2", "次世代HIFU", "熱拡散治療（TDT™）/ デュアルタイプ非侵襲リフトアップ / 様々な深度対応"],
            ["COOL FASE", "モノポーラRF", "先端直接冷却（DCC™）/ 痛みに配慮した施術設計 / 独自技術"],
            ["EVE SYNERGE", "RF複合機器", "RF×EMS / RF×Microcurrentシナジーモード / 肌コンディションの改善をサポート"],
            ["LDM", "高密度超音波", "肌コンディションのケア / リフティングケア + 肌質管理"]
          ]
        )}
      `
    })}
    ${section({
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
    ${koreanConsultSection()}
    ${cta()}
  `;
}

function jpCosmeticPage() {
  return `
    ${hero({
      compact: true,
      eyebrow: (siteData.pages['/cosmetic'] || {}).eyebrow || "メディカルコスメ",
      title: formatHeroTitle((siteData.pages['/cosmetic'] || {}).title || "メディカルコスメ"),
      copy: (siteData.pages['/cosmetic'] || {}).copy || "ZERO MEDICAL JAPANでは、日本のメディカルビジネスに最適な韓国製高品質コスメの新規ラインナップを選定中でございます。"
    })}
    ${section({
      kicker: "準備中",
      title: "新規製品ラインナップ選定およびリニューアル中",
      lead: "現在、最新のトレンドを捉えた安全でプレミアムな韓国製メディカルコスメ製品の導入を準備しております。コスメ製品の導入をご検討の事業者様や、OEM/ODM、製品流通提携にご興味のある方は、下記よりお気軽にお問い合わせください。",
      children: `
        <div class="notice" style="text-align: center; padding: 40px 20px; background: rgba(205, 178, 135, 0.08); border: 1px dashed var(--gold); border-radius: var(--radius);">
          <span style="font-size: 2.5rem; display: block; margin-bottom: 15px;">🛍️</span>
          <h3 style="font-size: 1.3rem; color: var(--navy); margin: 0 0 10px;">高品質メディカルコスメの調達・協業相談</h3>
          <p style="color: var(--muted); max-width: 600px; margin: 0 auto 20px; font-size: 0.95rem; line-height: 1.6;">
            ZERO MEDICAL JAPANの韓国現地ネットワークを通じて、貴社・貴院のコンセプトに最適な製品の探索や、バルクでの輸入相談、法適合手続きを一貫してサポートいたします。
          </p>
          <a class="button primary" href="/contact">提携・導入について相談する →</a>
        </div>
      `
    })}
    ${section({
      title: "導入・提携のご相談",
      className: "tint",
      lead: "個別のブランド調達要望やバルク輸入取引のご相談は、お問い合わせ後に専任担当より丁寧にご案内いたします。",
      children: `<a class="button dark" href="/contact">お問い合わせへ →</a>`
    })}
  `;
}

function jpMarketingPage() {
  return `
    ${hero({
      compact: true,
      eyebrow: (siteData.pages['/marketing'] || {}).eyebrow || "マーケティング支援",
      title: formatHeroTitle((siteData.pages['/marketing'] || {}).title || "マーケティング支援"),
      copy: (siteData.pages['/marketing'] || {}).copy || "戦略設計から施策の実行、リピート率向上まで、メディカルビジネスを包括的に支援いたします。"
    })}
    ${section({
      kicker: "制作イメージ",
      title: "マーケティング支援の取り組み",
      lead: "Webサイト制作からSNS運用・LINE構築まで、成果につながる施策をトータルでご提供します。",
      children: mediaGrid([
        {
          type: "model",
          label: "院内の実在感とブランディング",
          caption: "安心感と清潔感を視覚的に伝えるプロフェッショナル素材制作",
          src: "/assets/generated/marketing-clinic.png"
        },
        {
          type: "marketing",
          label: "反響を呼ぶコンテンツ設計",
          caption: "ターゲット層に響くビジュアルデザインと的確なコピーライティング",
          src: "/assets/generated/marketing-dashboard.png"
        },
        {
          type: "trust",
          label: "データ分析と継続的な改善",
          caption: "月次レポートをもとにコンバージョン率を高めるための最適化提案",
          src: "/assets/generated/marketing-meeting.png"
        }
      ])
    })}
    ${section({
      kicker: "サービス",
      title: "サービス詳細",
      children: table(
        ["サービス", "内容"],
        [
          ["Webマーケティング（SEO / MEO / 広告運用）", "美容医療に最適化したWebサイト・LP制作 / Google・SNS広告の戦略設計と運用 / SEO・MEO施策"],
          ["SNS運用・LINE構築", "Instagramを中心としたSNS運用支援 / LINE公式アカウント設計・リッチメニュー構築"],
          ["LINE・メール配信", "LINE・メールを活用した患者様向け配信設計 / リピートにつながる文章作成"],
          ["Web上の認知向上", "SEOツール活用 / 検索・SNS・広告を横断した認知向上施策"],
          ["ブランド戦略", "競合分析 / 立ち位置づくり / 価格戦略 / ターゲットに響くコンセプト設計"],
          ["内製化・自走支援", "スタッフが運用できる仕組みとマニュアル提供 / ダッシュボード設計でデータを見える化"],
          ["スタッフ教育支援", "接遇・カウンセリング・提案トーク・SNS対応の院内研修（オンライン対応可能）"]
        ]
      )
    })}
    ${section({
      kicker: "対象となる課題",
      title: "こんな課題をお持ちの方に",
      className: "tint",
      children: list([
        "広告費をかけているのに結果が出ない",
        "SNSやLINEを活用したいが運用が難しい",
        "強みがわかりづらく、他院と差別化できていない",
        "開業直後で認知や問い合わせが不十分",
        "経営データをもとに戦略を立てたい"
      ], "negative")
    })}
    ${koreanConsultSection()}
    ${cta()}
  `;
}

function jpSpacePage() {
  return `
    ${hero({
      compact: true,
      eyebrow: (siteData.pages['/space'] || {}).eyebrow || "会場レンタル",
      title: formatHeroTitle((siteData.pages['/space'] || {}).title || "大阪・東京の会場レンタル"),
      copy: (siteData.pages['/space'] || {}).copy || "商談会・相談会・セミナーにご利用いただける会場を、大阪（心斎橋）・東京エリアでご案内いたします。"
    })}
    ${section({
      kicker: "会場写真",
      title: "会場の雰囲気",
      lead: "ビジネスにふさわしい洗練された空間をご提供いたします。",
      children: mediaGrid([
        {
          type: "venue",
          label: "心斎橋・東京のセミナー特設会場",
          caption: "モダンで落ち着いた雰囲気の多目的レンタルスペース",
          src: "/assets/generated/venue-room.png"
        },
        {
          type: "trust",
          label: "一対一の商談および相談会",
          caption: "密度の高いビジネスコミュニケーションを生み出すレイアウト",
          src: "/assets/generated/venue-table.png"
        },
        {
          type: "product",
          label: "ブランドの世界観を伝える展示",
          caption: "製品サンプルやカタログが映える照明とテーブルセッティング",
          src: "/assets/generated/venue-display.png"
        }
      ])
    })}
    ${section({
      kicker: "利用シーン",
      title: "こんな用途に",
      children: list([
        "韓国メーカーと日本のクリニックとの製品商談会",
        "医薬品・医療機器・化粧品の展示・説明会",
        "日韓クロスボーダーのミーティング・セミナー",
        "短時間レンタルから1日貸切まで対応"
      ], "positive")
    })}
    ${section({
      kicker: "会場概要",
      title: "会場概要",
      className: "tint",
      children: table(
        ["項目", "大阪会場", "東京会場"],
        [
          ["所在地", "<span class=\"placeholder\">大阪府大阪市中央区心斎橋筋 1丁目 G-Building 4F</span>", "<span class=\"placeholder\">東京都中央区銀座 6丁目 10-1 GINZA SIX 11F</span>"],
          ["収容人数", "<span class=\"placeholder\">最大 30名（スクール形式）</span>", "<span class=\"placeholder\">最大 45名（シアター形式）</span>"],
          ["設備", "Wi-Fi / プロジェクター / ホワイトボード", "Wi-Fi / プロジェクター / ホワイトボード"],
          ["料金", "<span class=\"placeholder\">8,000円 / 時間（税抜）</span>", "<span class=\"placeholder\">10,000円 / 時間（税抜）</span>"],
          ["ご予約", "LINE公式 / お問い合わせフォーム", "LINE公式 / お問い合わせフォーム"]
        ]
      )
    })}
    ${koreanConsultSection()}
    ${cta()}
  `;
}

function jpAboutPage() {
  return `
    ${hero({
      compact: true,
      eyebrow: (siteData.pages['/about'] || {}).eyebrow || "会社情報",
      title: formatHeroTitle((siteData.pages['/about'] || {}).title || "日本と韓国の医療ビジネスを\nつなぐ専門会社"),
      copy: (siteData.pages['/about'] || {}).copy || "輸入代行から製品導入支援、メディカルコスメ、マーケティング支援、会場レンタルまで、日本のメディカルビジネスに必要なサービスをワンストップでご提供いたします。"
    })}
    ${section({
      kicker: "信頼情報",
      title: "事業方針と体制",
      lead: "日韓両国の医療市場に精通した専門チームが、貴院のビジネスを強力にバックアップいたします。",
      children: mediaGrid([
        {
          type: "trust",
          label: "日韓の架け橋となる専任担当",
          caption: "日本法人の窓口として丁寧かつ迅速にサポートします",
          src: "/assets/generated/trust-team.png"
        },
        {
          type: "clinic",
          label: "いつでも相談できるオフィス環境",
          caption: "製品のデモ体験や対面での密な相談にも対応可能な東京オフィス",
          src: "/assets/generated/about-office.png"
        },
        {
          type: "product",
          label: "多角的なサポート資料の完備",
          caption: "薬機法適合ガイドラインや導入メリットシミュレーション等の提供",
          src: "/assets/generated/about-catalog.png"
        }
      ])
    })}
    ${section({
      kicker: "会社概要",
      title: "会社概要",
      children: (function() {
        const c = (typeof siteData !== 'undefined' && siteData.company) ? siteData.company : {};
        const siteUrl = c.siteUrl || contact.jp.siteUrl;
        const telText = c.tel ? `${c.tel}${c.hours ? `（受付: ${c.hours}）` : ""}` : "";
        const rows = [
          ["会社名", `<span class="placeholder">${c.name || 'ZERO MEDICAL JAPAN'}</span>`],
          ["公式サイト", siteUrl ? `<a href="${esc(siteUrl)}" target="_blank" rel="noopener">${esc(formatSiteHost(siteUrl))}</a>` : ""],
          ["登録者名", `<span class="placeholder">${c.registrantName || ''}</span>`],
          ["登録者名（ローマ字）", `<span class="placeholder">${c.registrantRoman || ''}</span>`],
          ["登録担当者名", `<span class="placeholder">${c.registrationContact || ''}</span>`],
          ["登録担当者部署名", `<span class="placeholder">${c.registrationDepartment || ''}</span>`],
          ["郵便番号", `<span class="placeholder">${c.postalCode || ''}</span>`],
          ["都道府県", `<span class="placeholder">${c.prefecture || ''}</span>`],
          ["住所", `<span class="placeholder">${c.address || ''}</span>`],
          ["代表者", c.representative || '盧 在薫（JAEHOON NO）'],
          ["設立", `<span class="placeholder">${c.established || ''}</span>`],
          ["資本金", `<span class="placeholder">${c.capital || ''}</span>`],
          ["取引銀行", `<span class="placeholder">${c.bank || ''}</span>`],
          ["TEL", `<span class="placeholder">${telText}</span>`],
          ["FAX", `<span class="placeholder">${c.fax || ''}</span>`],
          ["Email", `<span class="placeholder">${c.email || ''}</span>`],
          ["対応言語", c.languages || '日本語・韓国語'],
          ["事業内容", c.business || '']
        ].filter((row) => String(row[1]).replace(/<[^>]*>/g, "").trim() !== "");

        return table(
          ["項目", "内容"],
          rows
        );
      })()
    })}
  `;
}

function contactPage() {
  const options = ["輸入代行", "製品導入支援", "メディカルコスメ", "マーケティング支援", "会場レンタル", "韓国語相談", "その他"];
  const data = contact.jp;
  const companyContact = siteData.company || data;
  return `
    ${hero({
      compact: true,
      eyebrow: (siteData.pages['/contact'] || {}).eyebrow || "お問い合わせ",
      title: formatHeroTitle((siteData.pages['/contact'] || {}).title || "お問い合わせ"),
      copy: (siteData.pages['/contact'] || {}).copy || "輸入代行・製品導入支援・マーケティング支援・会場利用に関するご相談を承ります。"
    })}
    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <div class="form-panel">
            <form class="contact-form" novalidate>
              <div class="form-grid">
                ${field("name", "お名前（必須）", "text", true)}
                ${field("company", "医療機関名・会社名（任意）", "text", false)}
                ${field("email", "メールアドレス（必須）", "email", true)}
                ${field("phone", "お電話番号（任意）", "tel", false)}
                <div class="field full">
                  <label>
                    ご相談内容（選択必須）
                    <select name="category" required>
                      <option value="">選択してください</option>
                      ${options.map((option) => `<option>${option}</option>`).join("")}
                    </select>
                  </label>
                </div>
                <div class="field full">
                  <label>
                    メッセージ（自由記述）
                    <textarea name="message"></textarea>
                  </label>
                </div>
                <label class="checkbox-field full">
                  <input type="checkbox" name="privacy" required />
                  <span>プライバシーポリシーに同意します。</span>
                </label>
              </div>
              <button class="button dark" type="submit">入力内容を確認</button>
              <p class="form-status" role="status" aria-live="polite"></p>
            </form>
          </div>
          <aside class="contact-panel">
            <div class="section-header">
              <p class="section-kicker">連絡方法</p>
              <h2>その他の連絡方法</h2>
            </div>
            <ul class="contact-list">
              ${contactListMarkup(companyContact, ["tel", "email", "line", "siteUrl"])}
            </ul>
            ${companyContact.line ? imageSlot({
              type: "qr",
              label: "LINE公式QRコード",
              caption: "推奨画像: LINE公式アカウントのQRコード",
              ratio: "qr",
              src: "/assets/generated/line-qr-placeholder.png"
            }) : ""}
            <div class="korean-contact-help">
              <h3>한국어 문의 안내</h3>
              <p>한국어 상담도 이 문의 폼으로 남겨 주세요. 상담 내용에서 「韓国語相談」을 선택하시면 됩니다.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `;
}

function field(name, label, type, required) {
  return `
    <div class="field">
      <label>
        ${label}
        <input name="${name}" type="${type}" ${required ? "required" : ""} />
      </label>
    </div>
  `;
}

const routes = {
  "/": {
    lang: "ja",
    title: "ZERO MEDICAL JAPAN | 日韓医療ビジネスパートナー",
    description: "韓国製医薬品の輸入代行、医療機器導入支援、メディカルコスメ、マーケティング支援、会場レンタルをワンストップでご提供。",
    render: jpTopPage
  },
  "/import": {
    lang: "ja",
    title: "輸入代行 | ZERO MEDICAL JAPAN",
    description: "韓国製医薬品・化粧品の輸入確認申請から通関まで、煩雑な手続きを一括代行いたします。",
    render: jpImportPage
  },
  "/products": {
    lang: "ja",
    title: "製品導入支援 | ZERO MEDICAL JAPAN",
    description: "貴院の状況と課題に合わせた韓国製医療機器・製品の導入を支援します。",
    render: jpProductsPage
  },
  "/cosmetic": {
    lang: "ja",
    title: "メディカルコスメ | ZERO MEDICAL JAPAN",
    description: "韓国製高品質メディカルコスメの新規ラインナップを準備中です。導入・提携のご相談を歓迎いたします。",
    render: jpCosmeticPage
  },
  "/marketing": {
    lang: "ja",
    title: "マーケティング支援 | ZERO MEDICAL JAPAN",
    description: "Webマーケティング・SNS運用・LINE構築など、メディカルビジネスの認知向上とブランド戦略を包括支援。",
    render: jpMarketingPage
  },
  "/space": {
    lang: "ja",
    title: "会場レンタル | ZERO MEDICAL JAPAN",
    description: "大阪・東京エリアで商談会・相談会向けの会場をご案内します。",
    render: jpSpacePage
  },
  "/about": {
    lang: "ja",
    title: "会社概要 | ZERO MEDICAL JAPAN",
    description: "ZERO MEDICAL JAPANの会社情報・事業内容・代表者情報をご紹介いたします。",
    render: jpAboutPage
  },
  "/contact": {
    lang: "ja",
    title: "お問い合わせ | ZERO MEDICAL JAPAN",
    description: "輸入代行・製品導入・マーケティング支援・会場利用に関するご相談・お問い合わせはこちら。",
    render: contactPage
  }
};

function notFoundPage() {
  return `
    <section class="not-found">
      <div class="container">
        <p class="section-kicker">404</p>
        <h1>ページが見つかりません</h1>
        <p class="section-lead">お探しのページは移動または削除された可能性があります。</p>
        <div class="hero-actions">
          <a class="button dark" href="/">TOPへ戻る</a>
          <a class="button" href="/contact">お問い合わせ</a>
        </div>
      </div>
    </section>
  `;
}

function updateMeta(route) {
  document.documentElement.lang = "ja";
  document.title = route.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", route.description);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", route.title);

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute("content", route.description);
}

function bindForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    try {
      event.preventDefault();
      const status = form.querySelector(".form-status");

      if (!form.checkValidity()) {
        form.reportValidity();
        if (status) status.textContent = "Please complete the required fields.";
        return;
      }

      if (status) {
        status.textContent = "送信先メールまたはフォームエンドポイントを設定すると、すぐに送信フォームとして接続できます。";
      }
    } catch (error) {
      console.error("Form submission error:", error);
      const status = form.querySelector(".form-status");
      if (status) status.textContent = "오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
    }
  });
}

function bindMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("open", !isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
  });
}

function render() {
  try {
    const path = normalizePath();
    const route = routes[path] || routes[`${path}/`] || null;
    const activePath = route ? path : "/";
    const lang = "ja";
  const resolved = route || {
    lang,
    title: "ページが見つかりません | ZERO MEDICAL JAPAN",
    description: "お探しのページは見つかりませんでした。",
    render: notFoundPage
  };

    updateMeta(resolved);
    document.getElementById("app").innerHTML = `
      <div class="site-shell">
        ${header(lang, activePath)}
        <main>${resolved.render()}</main>
        ${footer(lang)}
      </div>
    `;
    bindForm();
    bindMenu();
    window.scrollTo({ top: 0, behavior: "instant" });
  } catch (error) {
    console.error("Rendering error:", error);
    document.getElementById("app").innerHTML = `
      <div class="site-shell" style="padding: 100px 20px; text-align: center; color: var(--danger); background: var(--paper); min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px;">
        <span style="font-size: 3rem;">⚠️</span>
        <h2 style="font-size: 1.8rem; margin: 0;">시스템 오류가 발생했습니다</h2>
        <p style="color: var(--muted); max-width: 500px; margin: 0;">불편을 드려 죄송합니다. 일시적인 데이터 전송 또는 화면 표시 오류입니다. 페이지를 새로고침하시거나 잠시 후 다시 시도해 주세요.</p>
        <a href="/" class="button dark" style="margin-top: 10px; display: inline-flex; align-items: center; justify-content: center; padding: 12px 24px;">홈페이지로 돌아가기</a>
      </div>
    `;
  }
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");
  if (!link) return;
  const url = new URL(link.href);
  if (url.origin !== window.location.origin) return;
  event.preventDefault();
  history.pushState({}, "", url.pathname);
  render();
});

window.addEventListener("popstate", render);
render();
