import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync, existsSync, statSync } from "node:fs";

function safeWriteFileSync(path, content) {
  if (existsSync(path) && statSync(path).size > 200000) {
    console.log(`Skipped generating ${path} because a premium realistic asset already exists.`);
    return;
  }
  writeFileSync(path, content);
}

const width = 1600;
const height = 980;
const channels = 4;
const data = Buffer.alloc((width * channels + 1) * height);

function lerp(a, b, t) {
  return Math.round(a + (b - a) * t);
}

function setPixel(x, y, r, g, b, a = 255) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const rowStart = y * (width * channels + 1);
  const index = rowStart + 1 + x * channels;
  data[index] = r;
  data[index + 1] = g;
  data[index + 2] = b;
  data[index + 3] = a;
}

function fillRect(x, y, w, h, color) {
  for (let yy = Math.max(0, y); yy < Math.min(height, y + h); yy += 1) {
    for (let xx = Math.max(0, x); xx < Math.min(width, x + w); xx += 1) {
      setPixel(xx, yy, ...color);
    }
  }
}

function fillCircle(cx, cy, radius, color, alphaFalloff = false) {
  const r2 = radius * radius;
  for (let y = cy - radius; y <= cy + radius; y += 1) {
    for (let x = cx - radius; x <= cx + radius; x += 1) {
      const d2 = (x - cx) ** 2 + (y - cy) ** 2;
      if (d2 <= r2) {
        const t = Math.sqrt(d2) / radius;
        const a = alphaFalloff ? Math.max(0, Math.round(color[3] * (1 - t))) : color[3];
        setPixel(x, y, color[0], color[1], color[2], a);
      }
    }
  }
}

function blendPixel(x, y, r, g, b, a) {
  if (x < 0 || y < 0 || x >= width || y >= height) return;
  const rowStart = y * (width * channels + 1);
  const index = rowStart + 1 + x * channels;
  const source = a / 255;
  const dest = 1 - source;
  data[index] = Math.round(r * source + data[index] * dest);
  data[index + 1] = Math.round(g * source + data[index + 1] * dest);
  data[index + 2] = Math.round(b * source + data[index + 2] * dest);
  data[index + 3] = 255;
}

function blendRect(x, y, w, h, color) {
  for (let yy = Math.max(0, y); yy < Math.min(height, y + h); yy += 1) {
    for (let xx = Math.max(0, x); xx < Math.min(width, x + w); xx += 1) {
      blendPixel(xx, yy, ...color);
    }
  }
}

for (let y = 0; y < height; y += 1) {
  const t = y / height;
  const top = [247, 242, 231];
  const mid = [250, 247, 240];
  const bottom = [215, 206, 188];
  const mix = t < 0.65 ? t / 0.65 : (t - 0.65) / 0.35;
  const a = t < 0.65 ? top : mid;
  const b = t < 0.65 ? mid : bottom;
  for (let x = 0; x < width; x += 1) {
    const grain = (((x * 17 + y * 29) % 9) - 4) * 0.45;
    setPixel(
      x,
      y,
      Math.max(0, lerp(a[0], b[0], mix) + grain),
      Math.max(0, lerp(a[1], b[1], mix) + grain),
      Math.max(0, lerp(a[2], b[2], mix) + grain),
      255
    );
  }
}

fillCircle(1240, 170, 300, [205, 178, 135, 52], true);
fillCircle(950, 300, 430, [53, 73, 82, 34], true);

blendRect(0, 0, width, 92, [247, 242, 231, 72]);
blendRect(0, 742, width, 238, [215, 206, 188, 190]);
blendRect(0, 720, width, 12, [205, 178, 135, 88]);

// Frosted glass hospital windows.
blendRect(72, 132, 460, 456, [247, 242, 231, 166]);
blendRect(96, 158, 412, 402, [215, 206, 188, 118]);
for (let x = 160; x <= 440; x += 140) blendRect(x, 158, 5, 402, [255, 255, 255, 160]);
for (let y = 258; y <= 458; y += 100) blendRect(96, y, 412, 5, [255, 255, 255, 155]);

blendRect(1110, 118, 360, 430, [247, 242, 231, 132]);
blendRect(1134, 144, 312, 378, [215, 206, 188, 108]);
for (let x = 1228; x <= 1352; x += 124) blendRect(x, 144, 5, 378, [255, 255, 255, 150]);
for (let y = 270; y <= 420; y += 96) blendRect(1134, y, 312, 5, [255, 255, 255, 145]);

// Clean reception counter and clinical accent.
blendRect(690, 510, 660, 248, [247, 242, 231, 222]);
blendRect(724, 548, 592, 160, [250, 247, 240, 230]);
blendRect(690, 510, 660, 16, [205, 178, 135, 214]);
blendRect(724, 728, 592, 14, [53, 57, 50, 96]);
blendRect(760, 584, 150, 92, [215, 206, 188, 138]);
blendRect(946, 584, 150, 92, [247, 242, 231, 138]);
blendRect(1132, 584, 150, 92, [215, 206, 188, 138]);

// Minimal medical mark on the back wall.
blendRect(880, 236, 126, 34, [167, 49, 51, 112]);
blendRect(926, 190, 34, 126, [167, 49, 51, 112]);

// Soft ceiling lights.
blendRect(250, 96, 260, 12, [255, 255, 255, 148]);
blendRect(700, 96, 260, 12, [255, 255, 255, 148]);
blendRect(1140, 96, 260, 12, [255, 255, 255, 148]);

// Seating and a small plant keep the space warmer without making it busy.
blendRect(176, 650, 150, 52, [53, 57, 50, 76]);
blendRect(198, 602, 106, 58, [205, 178, 135, 108]);
blendRect(370, 650, 150, 52, [53, 57, 50, 58]);
blendRect(392, 602, 106, 58, [53, 73, 82, 88]);
blendRect(1390, 626, 64, 106, [53, 57, 50, 88]);
fillCircle(1375, 600, 42, [205, 178, 135, 78], true);
fillCircle(1438, 590, 48, [53, 73, 82, 72], true);

blendRect(250, 804, 940, 30, [255, 255, 255, 122]);
blendRect(330, 864, 640, 22, [205, 178, 135, 62]);

function pngChunk(type, bytes) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(bytes.length, 0);
  const crcBuffer = Buffer.alloc(4);
  const crcInput = Buffer.concat([typeBuffer, bytes]);
  crcBuffer.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([length, typeBuffer, bytes, crcBuffer]);
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const header = Buffer.alloc(13);
header.writeUInt32BE(width, 0);
header.writeUInt32BE(height, 4);
header[8] = 8;
header[9] = 6;
header[10] = 0;
header[11] = 0;
header[12] = 0;

const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const png = Buffer.concat([
  signature,
  pngChunk("IHDR", header),
  pngChunk("IDAT", deflateSync(data, { level: 9 })),
  pngChunk("IEND", Buffer.alloc(0))
]);

mkdirSync("assets", { recursive: true });
safeWriteFileSync("assets/hero-clinic.png", png);
console.log("Generated assets/hero-clinic.png");

const generatedDir = "assets/generated";
mkdirSync(generatedDir, { recursive: true });

const palette = {
  charcoal: [53, 57, 50],
  gold: [205, 178, 135],
  beige: [215, 206, 188],
  teal: [53, 73, 82],
  red: [167, 49, 51],
  paper: [247, 242, 231],
  white: [255, 255, 255]
};

function writeGeneratedAsset(fileName, variant) {
  const assetWidth = 1200;
  const assetHeight = 760;
  const assetChannels = 4;
  const assetData = Buffer.alloc((assetWidth * assetChannels + 1) * assetHeight);

  function assetSetPixel(x, y, r, g, b, a = 255) {
    if (x < 0 || y < 0 || x >= assetWidth || y >= assetHeight) return;
    const rowStart = y * (assetWidth * assetChannels + 1);
    const index = rowStart + 1 + x * assetChannels;
    assetData[index] = r;
    assetData[index + 1] = g;
    assetData[index + 2] = b;
    assetData[index + 3] = a;
  }

  function assetBlendPixel(x, y, r, g, b, a) {
    if (x < 0 || y < 0 || x >= assetWidth || y >= assetHeight) return;
    const rowStart = y * (assetWidth * assetChannels + 1);
    const index = rowStart + 1 + x * assetChannels;
    const source = a / 255;
    const dest = 1 - source;
    assetData[index] = Math.round(r * source + assetData[index] * dest);
    assetData[index + 1] = Math.round(g * source + assetData[index + 1] * dest);
    assetData[index + 2] = Math.round(b * source + assetData[index + 2] * dest);
    assetData[index + 3] = 255;
  }

  function rect(x, y, w, h, color, alpha = 255) {
    for (let yy = Math.max(0, y); yy < Math.min(assetHeight, y + h); yy += 1) {
      for (let xx = Math.max(0, x); xx < Math.min(assetWidth, x + w); xx += 1) {
        assetBlendPixel(xx, yy, color[0], color[1], color[2], alpha);
      }
    }
  }

  function circle(cx, cy, radius, color, alpha = 255, fade = false) {
    const r2 = radius * radius;
    for (let y = cy - radius; y <= cy + radius; y += 1) {
      for (let x = cx - radius; x <= cx + radius; x += 1) {
        const d2 = (x - cx) ** 2 + (y - cy) ** 2;
        if (d2 <= r2) {
          const t = Math.sqrt(d2) / radius;
          const a = fade ? Math.round(alpha * Math.max(0, 1 - t)) : alpha;
          assetBlendPixel(x, y, color[0], color[1], color[2], a);
        }
      }
    }
  }

  function panel(x, y, w, h, alpha = 196) {
    rect(x, y, w, h, palette.white, alpha);
    rect(x, y, w, 8, palette.gold, 150);
    rect(x, y + h - 8, w, 8, palette.charcoal, 42);
  }

  function person(cx, cy, scale = 1, color = palette.teal) {
    circle(cx, cy, Math.round(38 * scale), color, 210);
    rect(cx - Math.round(48 * scale), cy + Math.round(46 * scale), Math.round(96 * scale), Math.round(120 * scale), color, 185);
    rect(cx - Math.round(66 * scale), cy + Math.round(84 * scale), Math.round(132 * scale), Math.round(76 * scale), color, 120);
  }

  for (let y = 0; y < assetHeight; y += 1) {
    const t = y / assetHeight;
    const a = t < 0.58 ? palette.paper : palette.beige;
    const b = t < 0.58 ? [250, 247, 240] : [195, 182, 158];
    const mix = t < 0.58 ? t / 0.58 : (t - 0.58) / 0.42;
    for (let x = 0; x < assetWidth; x += 1) {
      const grain = (((x * 11 + y * 19) % 7) - 3) * 0.55;
      assetSetPixel(
        x,
        y,
        Math.max(0, lerp(a[0], b[0], mix) + grain),
        Math.max(0, lerp(a[1], b[1], mix) + grain),
        Math.max(0, lerp(a[2], b[2], mix) + grain),
        255
      );
    }
  }

  circle(930, 120, 260, palette.gold, 70, true);
  circle(420, 260, 360, palette.teal, 36, true);
  rect(0, 622, assetWidth, 138, palette.beige, 146);
  rect(0, 600, assetWidth, 10, palette.gold, 90);

  if (variant === "clinic") {
    panel(96, 92, 420, 330, 142);
    panel(684, 94, 382, 292, 136);
    person(342, 420, 1.1, palette.teal);
    person(780, 420, 1.05, palette.charcoal);
    rect(392, 462, 420, 82, palette.white, 190);
    rect(430, 484, 344, 16, palette.gold, 170);
    rect(474, 516, 102, 46, palette.paper, 170);
    rect(622, 516, 102, 46, palette.paper, 170);
  } else if (variant === "trust") {
    panel(90, 96, 1020, 408, 112);
    person(308, 300, 1.22, palette.teal);
    person(600, 282, 1.34, palette.charcoal);
    person(892, 300, 1.22, palette.teal);
    rect(318, 510, 564, 76, palette.white, 214);
    rect(360, 538, 172, 12, palette.gold, 180);
    rect(566, 538, 236, 12, palette.teal, 120);
  } else if (variant === "product") {
    rect(156, 512, 888, 92, palette.white, 204);
    rect(220, 278, 152, 234, palette.white, 230);
    rect(250, 246, 92, 44, palette.gold, 184);
    rect(430, 226, 180, 286, palette.paper, 236);
    rect(462, 282, 116, 92, palette.teal, 110);
    rect(674, 320, 148, 192, palette.white, 226);
    rect(700, 284, 96, 48, palette.red, 132);
    circle(930, 448, 78, palette.gold, 178);
    rect(890, 368, 80, 120, palette.white, 184);
  } else if (variant === "equipment") {
    panel(90, 90, 430, 372, 124);
    rect(666, 148, 268, 390, palette.white, 230);
    rect(700, 184, 200, 132, palette.teal, 162);
    rect(742, 350, 118, 92, palette.gold, 156);
    rect(720, 538, 160, 30, palette.charcoal, 100);
    rect(296, 500, 470, 76, palette.white, 212);
    rect(346, 462, 172, 42, palette.beige, 180);
    circle(996, 258, 68, palette.red, 118);
  } else if (variant === "model") {
    circle(612, 296, 190, palette.paper, 240);
    circle(612, 252, 86, palette.teal, 178);
    rect(512, 334, 200, 210, palette.teal, 142);
    circle(740, 340, 60, palette.gold, 136);
    rect(220, 500, 760, 84, palette.white, 190);
    rect(416, 518, 364, 14, palette.gold, 160);
  } else if (variant === "marketing") {
    rect(210, 186, 530, 330, palette.white, 224);
    rect(246, 226, 458, 68, palette.teal, 146);
    rect(258, 330, 96, 128, palette.gold, 172);
    rect(392, 374, 96, 84, palette.red, 124);
    rect(526, 292, 96, 166, palette.teal, 118);
    rect(796, 202, 190, 362, palette.charcoal, 190);
    rect(824, 238, 134, 248, palette.paper, 220);
    circle(894, 518, 22, palette.gold, 176);
  } else if (variant === "venue") {
    panel(130, 88, 940, 360, 126);
    rect(294, 500, 612, 94, palette.white, 210);
    rect(340, 526, 520, 18, palette.gold, 150);
    for (let i = 0; i < 5; i += 1) {
      rect(190 + i * 190, 422, 88, 120, palette.teal, 96);
      rect(205 + i * 190, 392, 58, 48, palette.charcoal, 82);
    }
    rect(454, 184, 294, 128, palette.white, 172);
    rect(492, 232, 218, 16, palette.red, 116);
  } else if (variant === "qr") {
    rect(285, 86, 630, 630, palette.white, 238);
    rect(348, 148, 126, 126, palette.charcoal, 230);
    rect(726, 148, 126, 126, palette.charcoal, 230);
    rect(348, 526, 126, 126, palette.charcoal, 230);
    for (let row = 0; row < 11; row += 1) {
      for (let col = 0; col < 11; col += 1) {
        const finder =
          (row < 3 && col < 3) ||
          (row < 3 && col > 7) ||
          (row > 7 && col < 3);
        if (finder) continue;
        if ((row * 5 + col * 7 + row * col) % 4 < 2) {
          rect(378 + col * 42, 178 + row * 42, 28, 28, palette.teal, 210);
        }
      }
    }
    rect(502, 330, 196, 28, palette.gold, 210);
    rect(544, 418, 112, 70, palette.red, 148);
  }

  const assetHeader = Buffer.alloc(13);
  assetHeader.writeUInt32BE(assetWidth, 0);
  assetHeader.writeUInt32BE(assetHeight, 4);
  assetHeader[8] = 8;
  assetHeader[9] = 6;
  assetHeader[10] = 0;
  assetHeader[11] = 0;
  assetHeader[12] = 0;

  const assetPng = Buffer.concat([
    signature,
    pngChunk("IHDR", assetHeader),
    pngChunk("IDAT", deflateSync(assetData, { level: 9 })),
    pngChunk("IEND", Buffer.alloc(0))
  ]);

  safeWriteFileSync(`${generatedDir}/${fileName}`, assetPng);
}

const generatedAssets = [
  ["clinic-consultation.png", "clinic"],
  ["trust-team.png", "trust"],
  ["product-display.png", "product"],
  ["equipment-demo.png", "equipment"],
  ["model-treatment.png", "model"],
  ["marketing-dashboard.png", "marketing"],
  ["venue-room.png", "venue"],
  ["line-qr-placeholder.png", "qr"]
];

for (const [fileName, variant] of generatedAssets) {
  writeGeneratedAsset(fileName, variant);
}

console.log(`Generated ${generatedAssets.length} supporting image assets.`);
