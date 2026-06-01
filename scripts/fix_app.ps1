chcp 65001
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$filePath = "c:\Users\ROSIE\Desktop\Aureum_AI_Team\zeromedical\app.js"
$text = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

Write-Output "Original length: $($text.Length)"

# ============================================================
# FIX 1: Repair the broken import page table row and remove
#         the first (broken) jpCosmeticPage + orphaned jpProductsPage code
# ============================================================

# The broken section starts with the truncated table row in jpImportPage:
#   ["その他", "極細...備品", "ご要望に応じ(BROKEN)function jpCosmeticPage()...}(ORPHANED jpProductsPage code)...}
# and should be replaced with a proper table close + jpProductsPage function

# Find the broken section boundaries
$brokenRowStart = $text.IndexOf('["' + [char]0x305D + [char]0x306E + [char]0x4ED6 + '"')  # ["その他"
Write-Output "Broken row start: $brokenRowStart"

# Find the second jpCosmeticPage (the one we'll replace) 
$firstCosmeticIdx = $text.IndexOf("function jpCosmeticPage")
$secondCosmeticIdx = $text.IndexOf("function jpCosmeticPage", $firstCosmeticIdx + 1)
$marketingIdx = $text.IndexOf("function jpMarketingPage")

Write-Output "First jpCosmeticPage at: $firstCosmeticIdx"
Write-Output "Second jpCosmeticPage at: $secondCosmeticIdx"
Write-Output "jpMarketingPage at: $marketingIdx"

# The broken area is from the broken row ["その他"...] through to "function jpCosmeticPage" (second one)
# We need to replace: from $brokenRowStart to $secondCosmeticIdx-1
# with: proper table row close + jpProductsPage function + new jpCosmeticPage

# Extract the orphaned jpProductsPage content that's between first cosmeticPage closing and second cosmeticPage
# First cosmetic page closing: find the ";}分析" pattern 
$firstCosmeticClose = $text.IndexOf("  ``;" + "`n}" + [char]0xFFFD, $firstCosmeticIdx)
Write-Output "Looking for close..."

# Let's use a more reliable approach - just replace the entire region
# From ["その他" row to the start of "function jpCosmeticPage" (second)

# Build the replacement:
$replacement = @'
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

'@

# Find the exact broken region
# Start: the broken row ["その他"...
# End: just before the second "function jpCosmeticPage"

$brokenRegionEnd = $secondCosmeticIdx

# We need to go back from $brokenRowStart to find the start of the line
$lineStart = $text.LastIndexOf("`n", $brokenRowStart) + 1
Write-Output "Line start: $lineStart"

# The text to replace is from lineStart to brokenRegionEnd-1
$oldText = $text.Substring($lineStart, $brokenRegionEnd - $lineStart)
Write-Output "Old text length: $($oldText.Length)"
Write-Output "Old text first 100: $($oldText.Substring(0, [Math]::Min(100, $oldText.Length)))"
Write-Output "Old text last 100: $($oldText.Substring([Math]::Max(0, $oldText.Length - 100)))"

$text = $text.Substring(0, $lineStart) + "            " + $replacement + "`n`n" + $text.Substring($brokenRegionEnd)

Write-Output "After fix 1 length: $($text.Length)"

# ============================================================
# FIX 2: Replace the second jpCosmeticPage (now the only one)
#         with the "準備中" version
# ============================================================

$newCosmeticPage = @'
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
'@

# Find the remaining jpCosmeticPage and replace it
$cosmeticIdx = $text.IndexOf("function jpCosmeticPage")
$nextFuncIdx = $text.IndexOf("function jpMarketingPage")

Write-Output "Cosmetic function at: $cosmeticIdx"
Write-Output "Next function at: $nextFuncIdx"

$oldCosmeticPage = $text.Substring($cosmeticIdx, $nextFuncIdx - $cosmeticIdx)
Write-Output "Old cosmetic page length: $($oldCosmeticPage.Length)"

$text = $text.Substring(0, $cosmeticIdx) + $newCosmeticPage + "`n`n" + $text.Substring($nextFuncIdx)

# ============================================================
# FIX 3: Update the /cosmetic route metadata
# ============================================================

$text = $text.Replace(
  'title: "メディカルコスメ t:aim | ZERO MEDICAL"',
  'title: "メディカルコスメ | ZERO MEDICAL"'
)

$text = $text.Replace(
  '韓国発の高品質メディカルコスメ t:aim をご紹介',
  '韓国製高品質メディカルコスメの新規ラインナップを準備中です'
)

Write-Output "Final length: $($text.Length)"

# Write back
[System.IO.File]::WriteAllText($filePath, $text, [System.Text.Encoding]::UTF8)
Write-Output "app.js updated successfully!"
