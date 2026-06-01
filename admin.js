// ============================================================================
// ZERO MEDICAL JAPAN — Admin Panel & Site State Management
// ============================================================================

const defaultSiteData = {
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
  nav: [
    { href: "/", label: "TOP", visible: true },
    { href: "/import", label: "輸入代行", visible: true },
    { href: "/products", label: "製品導入支援", visible: true },
    { href: "/marketing", label: "マーケティング支援", visible: true },
    { href: "/space", label: "会場レンタル", visible: true },
    { href: "/cosmetic", label: "メディカルコスメ", visible: false },
    { href: "/about", label: "会社概要", visible: true },
    { href: "/contact", label: "お問い合わせ", visible: true }
  ],
  pages: {
    "/": {
      eyebrow: "日本法人",
      title: "日韓医療ビジネスを、\nゼロからサポートします。",
      copy: "韓国の先進的な医療技術と製品で、貴院の競争力を強化します。"
    },
    "/import": {
      eyebrow: "輸入代行",
      title: "韓国製医薬品の輸入手続きを、\n適正かつスムーズに。",
      copy: "韓国製医薬品・製品の輸入代行を承ります。煩雑な申請・通関手続きは弊社が一括で対応いたします。"
    },
    "/products": {
      eyebrow: "製品導入支援",
      title: "貴院に合った製品導入を\nサポート",
      copy: "患者層・立地・診療方針・ご予算を総合的に分析し、最適な製品・施策をご提案いたします。"
    },
    "/cosmetic": {
      eyebrow: "メディカルコスメ",
      title: "メディカルコスメ",
      copy: "ZERO MEDICAL JAPANでは、日本のメディカルビジネスに最適な韓国製高品質コスメの新規ラインナップを選定中でございます。"
    },
    "/marketing": {
      eyebrow: "マーケティング支援",
      title: "マーケティング支援",
      copy: "戦略設計から施策の実行、リピート率向上まで、メディカルビジネスを包括的に支援いたします。"
    },
    "/space": {
      eyebrow: "会場レンタル",
      title: "大阪・東京の会場レンタル",
      copy: "商談会・相談会・セミナーにご利用いただける会場を、大阪（心斎橋）・東京エリアでご案内いたします。"
    },
    "/about": {
      eyebrow: "会社情報",
      title: "日本と韓国の医療ビジネスを\nつなぐ専門会社",
      copy: "輸入代行から製品導入支援、メディカルコスメ、マーケティング支援、会場レンタルまで、日本のメディカルビジネスに必要なサービスをワンストップでご提供いたします。"
    },
    "/contact": {
      eyebrow: "お問い合わせ",
      title: "お問い合わせ",
      copy: "輸入代行・製品導入支援・マーケティング支援・会場利用に関するご相談を承ります。"
    }
  },
  styles: {
    primaryColor: "",
    accentColor: "",
    textColor: "",
    fontFamily: ""
  }
};

/* Global state — accessed by app.js */
let siteData = {};

function mergeDeep(target, source) {
  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === "object" &&
      !Array.isArray(target[key])
    ) {
      output[key] = mergeDeep(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}

function initSiteData() {
  const saved = localStorage.getItem("zeromedical_site_data");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      siteData = mergeDeep(JSON.parse(JSON.stringify(defaultSiteData)), parsed);
    } catch (e) {
      console.warn("Failed to load saved site data:", e);
      siteData = JSON.parse(JSON.stringify(defaultSiteData));
    }
  } else {
    siteData = JSON.parse(JSON.stringify(defaultSiteData));
  }

  if (normalizeSiteDataLabels()) {
    saveSiteData();
  }
}

function saveSiteData() {
  try {
    localStorage.setItem("zeromedical_site_data", JSON.stringify(siteData));
  } catch (e) {
    console.error("Failed to save site data:", e);
  }
}

function normalizeSiteDataLabels() {
  let changed = false;
  const normalizeText = (value) => {
    if (typeof value !== "string") return value;
    let next = value;
    if (next === "集患・売上・ブランド力を\n高める集患・マーケティング支援") {
      next = "マーケティング支援";
    }
    next = next
      .replaceAll("集患・マーケティング支援", "マーケティング支援")
      .replaceAll("集患支援", "マーケティング支援")
      .replaceAll("集患施策", "施策")
      .replaceAll("Web集客", "Webマーケティング");
    if (next !== value) changed = true;
    return next;
  };

  if (siteData.company) {
    const c = siteData.company;
    const companyReplacements = {
      name: ["ゼロメディカルジャパン（ZERO MEDICAL JAPAN）", defaultSiteData.company.name],
      address: ["〒104-0061 東京都中央区銀座 6丁目 10-1 GINZA SIX 11F", defaultSiteData.company.address],
      representative: ["代表取締役 ノ・ジェフン（NO JAE HOON）", defaultSiteData.company.representative],
      established: ["2026年 5月", defaultSiteData.company.established],
      capital: ["1,500万円", defaultSiteData.company.capital],
      bank: ["三菱UFJ銀行 / 三井住友銀行", defaultSiteData.company.bank],
      tel: ["03-6262-6262", defaultSiteData.company.tel],
      hours: ["10:00〜19:00（土日祝除く）", defaultSiteData.company.hours],
      fax: ["03-6262-6263", defaultSiteData.company.fax],
      email: ["contact@zeromedical.co.jp", defaultSiteData.company.email],
      line: ["@zeromedical", defaultSiteData.company.line]
    };

    Object.entries(companyReplacements).forEach(([key, pair]) => {
      if (c[key] === pair[0]) {
        c[key] = pair[1];
        changed = true;
      }
    });

    c.business = normalizeText(c.business);
  }

  if (Array.isArray(siteData.nav)) {
    siteData.nav.forEach((item) => {
      if (item && item.href === "/marketing") {
        item.label = normalizeText(item.label);
      }
    });
  }

  if (siteData.pages) {
    Object.values(siteData.pages).forEach((page) => {
      if (!page) return;
      page.eyebrow = normalizeText(page.eyebrow);
      page.title = normalizeText(page.title);
      page.copy = normalizeText(page.copy);
    });
  }

  return changed;
}

function formatHeroTitle(text) {
  if (!text) return "";
  return text.replace(/\n/g, "<br />");
}

function applyCustomStyles() {
  let tag = document.getElementById("custom-admin-styles");
  if (!tag) {
    tag = document.createElement("style");
    tag.id = "custom-admin-styles";
    document.head.appendChild(tag);
  }
  const s = siteData.styles || {};
  const rules = [];
  if (s.primaryColor) {
    rules.push(`--teal: ${s.primaryColor};`);
    rules.push(`--navy: ${s.primaryColor};`);
    rules.push(`--navy-strong: ${s.primaryColor};`);
  }
  if (s.accentColor) {
    rules.push(`--gold: ${s.accentColor};`);
  }
  if (s.textColor) {
    rules.push(`--ink: ${s.textColor};`);
    rules.push(`--muted: ${s.textColor};`);
  }
  let css = "";
  if (rules.length > 0) {
    css += `:root { ${rules.join(" ")} }\n`;
  }
  if (s.fontFamily) {
    css += `body { font-family: ${s.fontFamily}, "Noto Sans JP", "Noto Sans KR", sans-serif !important; }\n`;
  }
  tag.textContent = css;
}

// ============================================================================
// Admin Panel — Helper to escape HTML
// ============================================================================

function adminEsc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ============================================================================
// Admin Panel — Page Template
// ============================================================================

function adminPage() {
  return `
    <section class="admin-panel">
      <div class="admin-container">
        <div class="admin-header">
          <div class="admin-header-text">
            <h1>管理者パネル <span class="admin-badge">Admin</span></h1>
            <p>サイトの設定やコンテンツをリアルタイムで管理できます。</p>
          </div>
          <div class="admin-toolbar">
            <button class="admin-btn outline" id="admin-export" title="設定をJSONファイルとしてエクスポート">
              <span class="admin-btn-icon">⬇</span> エクスポート
            </button>
            <button class="admin-btn outline" id="admin-import-trigger" title="JSONファイルから設定をインポート">
              <span class="admin-btn-icon">⬆</span> インポート
            </button>
            <input type="file" id="admin-import-file" accept=".json" style="display:none" />
            <button class="admin-btn danger" id="admin-reset" title="全設定を初期状態に戻す">
              <span class="admin-btn-icon">↻</span> リセット
            </button>
          </div>
        </div>

        <div class="admin-tabs" role="tablist">
          <button class="admin-tab active" data-tab="menu" role="tab">
            <span class="admin-tab-icon">📋</span> メニュー設定
          </button>
          <button class="admin-tab" data-tab="pages" role="tab">
            <span class="admin-tab-icon">📝</span> ページコンテンツ
          </button>
          <button class="admin-tab" data-tab="company" role="tab">
            <span class="admin-tab-icon">🏢</span> 会社情報
          </button>
          <button class="admin-tab" data-tab="theme" role="tab">
            <span class="admin-tab-icon">🎨</span> テーマ設定
          </button>
        </div>

        <div class="admin-tab-body" id="tab-menu">${adminMenuTab()}</div>
        <div class="admin-tab-body" id="tab-pages" style="display:none">${adminPagesTab()}</div>
        <div class="admin-tab-body" id="tab-company" style="display:none">${adminCompanyTab()}</div>
        <div class="admin-tab-body" id="tab-theme" style="display:none">${adminThemeTab()}</div>
      </div>
    </section>
  `;
}

// ============================================================================
// Admin Panel — Tab: Menu Settings
// ============================================================================

function adminMenuTab() {
  return `
    <div class="admin-card">
      <h2>ナビゲーションメニュー設定</h2>
      <p class="admin-desc">メニューの名前変更、表示/非表示の切り替え、表示順序の変更ができます。</p>
      <div class="admin-menu-list" id="admin-menu-list">
        ${siteData.nav
          .map(
            (item, i) => `
          <div class="admin-menu-item" data-index="${i}">
            <div class="admin-menu-controls">
              <button class="admin-icon-btn" data-action="move-up" data-index="${i}" ${i === 0 ? "disabled" : ""} title="上に移動">▲</button>
              <button class="admin-icon-btn" data-action="move-down" data-index="${i}" ${i === siteData.nav.length - 1 ? "disabled" : ""} title="下に移動">▼</button>
            </div>
            <div class="admin-menu-info">
              <label class="admin-label-sm">メニュー名</label>
              <input type="text" class="admin-input" data-field="nav-label" data-index="${i}" value="${adminEsc(item.label)}" />
            </div>
            <div class="admin-menu-path">
              <span class="admin-chip">${adminEsc(item.href)}</span>
            </div>
            <label class="admin-toggle">
              <input type="checkbox" data-field="nav-visible" data-index="${i}" ${item.visible !== false ? "checked" : ""} />
              <span class="admin-toggle-slider"></span>
              <span class="admin-toggle-text">${item.visible !== false ? "表示" : "非表示"}</span>
            </label>
          </div>
        `
          )
          .join("")}
      </div>
      <div class="admin-actions">
        <button class="admin-btn primary" id="save-menu">💾 変更を保存</button>
      </div>
    </div>
  `;
}

// ============================================================================
// Admin Panel — Tab: Page Content Editor
// ============================================================================

function adminPagesTab() {
  const pageLabels = {
    "/": "TOP（トップページ）",
    "/import": "輸入代行",
    "/products": "製品導入支援",
    "/cosmetic": "メディカルコスメ",
    "/marketing": "マーケティング支援",
    "/space": "会場レンタル",
    "/about": "会社概要",
    "/contact": "お問い合わせ"
  };
  return `
    <div class="admin-card">
      <h2>ページコンテンツ編集</h2>
      <p class="admin-desc">各ページのヒーローセクションのテキストを編集できます。タイトルの改行は自動的に反映されます。</p>
      <div class="admin-field">
        <label class="admin-label">編集するページを選択</label>
        <select class="admin-select" id="admin-page-select">
          ${Object.keys(siteData.pages)
            .map(
              (key) =>
                `<option value="${adminEsc(key)}">${pageLabels[key] || key}</option>`
            )
            .join("")}
        </select>
      </div>
      <div id="admin-page-fields">
        ${adminPageFields("/")}
      </div>
      <div class="admin-actions">
        <button class="admin-btn primary" id="save-pages">💾 変更を保存</button>
      </div>
    </div>
  `;
}

function adminPageFields(path) {
  const p = siteData.pages[path] || {};
  return `
    <div class="admin-field">
      <label class="admin-label">キッカー（小見出し）</label>
      <input type="text" class="admin-input" id="page-eyebrow" value="${adminEsc(p.eyebrow || "")}" />
    </div>
    <div class="admin-field">
      <label class="admin-label">タイトル <small>（改行で行を分割）</small></label>
      <textarea class="admin-textarea" id="page-title" rows="3">${adminEsc(p.title || "")}</textarea>
    </div>
    <div class="admin-field">
      <label class="admin-label">サブコピー（説明文）</label>
      <textarea class="admin-textarea" id="page-copy" rows="3">${adminEsc(p.copy || "")}</textarea>
    </div>
  `;
}

// ============================================================================
// Admin Panel — Tab: Company Information
// ============================================================================

function adminCompanyTab() {
  const c = siteData.company;
  const fields = [
    { key: "name", label: "会社名", type: "text" },
    { key: "siteUrl", label: "公式サイト", type: "url" },
    { key: "registrantName", label: "登録者名", type: "text" },
    { key: "registrantRoman", label: "登録者名（ローマ字）", type: "text" },
    { key: "registrationContact", label: "登録担当者名", type: "text" },
    { key: "registrationDepartment", label: "登録担当者部署名", type: "text" },
    { key: "postalCode", label: "郵便番号", type: "text" },
    { key: "prefecture", label: "都道府県", type: "text" },
    { key: "address", label: "住所", type: "text" },
    { key: "representative", label: "代表者", type: "text" },
    { key: "established", label: "設立", type: "text" },
    { key: "capital", label: "資本金", type: "text" },
    { key: "bank", label: "取引銀行", type: "text" },
    { key: "tel", label: "TEL", type: "text" },
    { key: "hours", label: "受付時間", type: "text" },
    { key: "fax", label: "FAX", type: "text" },
    { key: "email", label: "Email", type: "email" },
    { key: "line", label: "LINE ID", type: "text" },
    { key: "languages", label: "対応言語", type: "text" },
    { key: "business", label: "事業内容", type: "textarea" }
  ];
  return `
    <div class="admin-card">
      <h2>会社情報</h2>
      <p class="admin-desc">ここで変更した情報は、フッター・会社概要ページ・お問い合わせページに自動的に反映されます。</p>
      <div class="admin-company-grid">
        ${fields
          .map(
            (f) => `
          <div class="admin-field ${f.type === "textarea" ? "full" : ""}">
            <label class="admin-label">${f.label}</label>
            ${
              f.type === "textarea"
                ? `<textarea class="admin-textarea" data-company="${f.key}" rows="3">${adminEsc(c[f.key] || "")}</textarea>`
                : `<input type="${f.type}" class="admin-input" data-company="${f.key}" value="${adminEsc(c[f.key] || "")}" />`
            }
          </div>
        `
          )
          .join("")}
      </div>
      <div class="admin-actions">
        <button class="admin-btn primary" id="save-company">💾 変更を保存</button>
      </div>
    </div>
  `;
}

// ============================================================================
// Admin Panel — Tab: Theme Settings
// ============================================================================

function adminThemeTab() {
  const s = siteData.styles || {};
  return `
    <div class="admin-card">
      <h2>テーマ設定</h2>
      <p class="admin-desc">サイト全体の配色やフォントを変更できます。保存後にリアルタイムで反映されます。</p>
      <div class="admin-theme-grid">
        <div class="admin-field">
          <label class="admin-label">メインカラー</label>
          <div class="admin-color-row">
            <input type="color" class="admin-color" id="theme-primary" value="${s.primaryColor || "#354952"}" />
            <input type="text" class="admin-input mono" id="theme-primary-hex" value="${adminEsc(s.primaryColor || "")}" placeholder="#354952" />
          </div>
        </div>
        <div class="admin-field">
          <label class="admin-label">アクセントカラー</label>
          <div class="admin-color-row">
            <input type="color" class="admin-color" id="theme-accent" value="${s.accentColor || "#cdb287"}" />
            <input type="text" class="admin-input mono" id="theme-accent-hex" value="${adminEsc(s.accentColor || "")}" placeholder="#cdb287" />
          </div>
        </div>
        <div class="admin-field">
          <label class="admin-label">テキストカラー</label>
          <div class="admin-color-row">
            <input type="color" class="admin-color" id="theme-text" value="${s.textColor || "#353932"}" />
            <input type="text" class="admin-input mono" id="theme-text-hex" value="${adminEsc(s.textColor || "")}" placeholder="#353932" />
          </div>
        </div>
        <div class="admin-field">
          <label class="admin-label">フォント</label>
          <select class="admin-select" id="theme-font">
            <option value="" ${!s.fontFamily ? "selected" : ""}>デフォルト（Noto Sans JP）</option>
            <option value="'Playfair Display', serif" ${s.fontFamily && s.fontFamily.includes("Playfair") ? "selected" : ""}>Playfair Display（セリフ / 明朝）</option>
            <option value="'Century Gothic', sans-serif" ${s.fontFamily && s.fontFamily.includes("Century") ? "selected" : ""}>Century Gothic（ラウンド）</option>
            <option value="'Roboto', sans-serif" ${s.fontFamily && s.fontFamily.includes("Roboto") ? "selected" : ""}>Roboto（モダン）</option>
            <option value="system-ui, sans-serif" ${s.fontFamily && s.fontFamily.includes("system-ui") ? "selected" : ""}>システムフォント</option>
          </select>
        </div>
      </div>
      <div class="admin-actions">
        <button class="admin-btn primary" id="save-theme">💾 変更を保存</button>
        <button class="admin-btn outline" id="reset-theme">デフォルトに戻す</button>
      </div>
    </div>
  `;
}

// ============================================================================
// Admin Panel — Toast Notification
// ============================================================================

function showAdminToast(message, isError) {
  let toast = document.getElementById("admin-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "admin-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.className = "admin-toast show " + (isError ? "error" : "success");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(function () {
    toast.className = "admin-toast";
  }, 3000);
}

// ============================================================================
// Admin Panel — Event Binding
// ============================================================================

function bindAdmin() {
  const panel = document.querySelector(".admin-panel");
  if (!panel) return;

  // --- Tab switching ---
  panel.querySelectorAll(".admin-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      panel.querySelectorAll(".admin-tab").forEach(function (t) {
        t.classList.remove("active");
      });
      panel.querySelectorAll(".admin-tab-body").forEach(function (b) {
        b.style.display = "none";
      });
      tab.classList.add("active");
      var target = document.getElementById("tab-" + tab.dataset.tab);
      if (target) target.style.display = "block";
    });
  });

  // --- Menu Tab: Move up / Move down ---
  panel.querySelectorAll("[data-action]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var i = parseInt(btn.dataset.index);
      var dir = btn.dataset.action === "move-up" ? -1 : 1;
      var j = i + dir;
      if (j < 0 || j >= siteData.nav.length) return;
      var tmp = siteData.nav[i];
      siteData.nav[i] = siteData.nav[j];
      siteData.nav[j] = tmp;
      saveSiteData();
      render();
    });
  });

  // --- Menu Tab: Save ---
  var saveMenu = document.getElementById("save-menu");
  if (saveMenu) {
    saveMenu.addEventListener("click", function () {
      panel.querySelectorAll("[data-field='nav-label']").forEach(function (input) {
        var i = parseInt(input.dataset.index);
        siteData.nav[i].label = input.value;
      });
      panel.querySelectorAll("[data-field='nav-visible']").forEach(function (input) {
        var i = parseInt(input.dataset.index);
        siteData.nav[i].visible = input.checked;
      });
      saveSiteData();
      showAdminToast("メニュー設定を保存しました");
      render();
    });
  }

  // --- Pages Tab: Page selector ---
  var pageSelect = document.getElementById("admin-page-select");
  if (pageSelect) {
    pageSelect.addEventListener("change", function () {
      var fieldsContainer = document.getElementById("admin-page-fields");
      if (fieldsContainer) {
        fieldsContainer.innerHTML = adminPageFields(pageSelect.value);
      }
    });
  }

  // --- Pages Tab: Save ---
  var savePages = document.getElementById("save-pages");
  if (savePages) {
    savePages.addEventListener("click", function () {
      var path = document.getElementById("admin-page-select").value;
      if (!siteData.pages[path]) siteData.pages[path] = {};
      var eyebrowEl = document.getElementById("page-eyebrow");
      var titleEl = document.getElementById("page-title");
      var copyEl = document.getElementById("page-copy");
      if (eyebrowEl) siteData.pages[path].eyebrow = eyebrowEl.value;
      if (titleEl) siteData.pages[path].title = titleEl.value;
      if (copyEl) siteData.pages[path].copy = copyEl.value;
      saveSiteData();
      showAdminToast("ページコンテンツを保存しました");
    });
  }

  // --- Company Tab: Save ---
  var saveCompany = document.getElementById("save-company");
  if (saveCompany) {
    saveCompany.addEventListener("click", function () {
      panel.querySelectorAll("[data-company]").forEach(function (input) {
        siteData.company[input.dataset.company] = input.value;
      });
      saveSiteData();
      showAdminToast("会社情報を保存しました");
      render();
    });
  }

  // --- Theme Tab: Color picker sync ---
  ["primary", "accent", "text"].forEach(function (key) {
    var picker = document.getElementById("theme-" + key);
    var hex = document.getElementById("theme-" + key + "-hex");
    if (picker && hex) {
      picker.addEventListener("input", function () {
        hex.value = picker.value;
      });
      hex.addEventListener("input", function () {
        if (/^#[0-9a-fA-F]{6}$/.test(hex.value)) {
          picker.value = hex.value;
        }
      });
    }
  });

  // --- Theme Tab: Save ---
  var saveTheme = document.getElementById("save-theme");
  if (saveTheme) {
    saveTheme.addEventListener("click", function () {
      var ph = document.getElementById("theme-primary-hex");
      var ah = document.getElementById("theme-accent-hex");
      var th = document.getElementById("theme-text-hex");
      var ff = document.getElementById("theme-font");
      siteData.styles.primaryColor = ph ? ph.value : "";
      siteData.styles.accentColor = ah ? ah.value : "";
      siteData.styles.textColor = th ? th.value : "";
      siteData.styles.fontFamily = ff ? ff.value : "";
      saveSiteData();
      applyCustomStyles();
      showAdminToast("テーマ設定を保存しました");
    });
  }

  // --- Theme Tab: Reset ---
  var resetTheme = document.getElementById("reset-theme");
  if (resetTheme) {
    resetTheme.addEventListener("click", function () {
      siteData.styles = { primaryColor: "", accentColor: "", textColor: "", fontFamily: "" };
      saveSiteData();
      applyCustomStyles();
      showAdminToast("テーマをデフォルトに戻しました");
      render();
    });
  }

  // --- Toolbar: Export ---
  var exportBtn = document.getElementById("admin-export");
  if (exportBtn) {
    exportBtn.addEventListener("click", function () {
      var blob = new Blob([JSON.stringify(siteData, null, 2)], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "zeromedical-settings-" + new Date().toISOString().slice(0, 10) + ".json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showAdminToast("設定をエクスポートしました");
    });
  }

  // --- Toolbar: Import ---
  var importTrigger = document.getElementById("admin-import-trigger");
  var importFile = document.getElementById("admin-import-file");
  if (importTrigger && importFile) {
    importTrigger.addEventListener("click", function () {
      importFile.click();
    });
    importFile.addEventListener("change", function (e) {
      var file = e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var imported = JSON.parse(reader.result);
          siteData = mergeDeep(JSON.parse(JSON.stringify(defaultSiteData)), imported);
          saveSiteData();
          applyCustomStyles();
          showAdminToast("設定をインポートしました");
          render();
        } catch (err) {
          showAdminToast("インポート失敗: 無効なJSONファイルです", true);
        }
      };
      reader.readAsText(file);
    });
  }

  // --- Toolbar: Reset ---
  var resetBtn = document.getElementById("admin-reset");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      if (confirm("全ての設定をデフォルトに戻します。\nこの操作は取り消せません。続行しますか？")) {
        localStorage.removeItem("zeromedical_site_data");
        siteData = JSON.parse(JSON.stringify(defaultSiteData));
        applyCustomStyles();
        showAdminToast("全設定をリセットしました");
        render();
      }
    });
  }
}
