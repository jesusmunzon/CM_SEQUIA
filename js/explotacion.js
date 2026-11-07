let EXPLOTACION_DATA = null;

function selectExplotacionData(fecha) {
  const dataset = window.EXPLOTACION_DATASET || {};
  if (dataset[fecha]) return dataset[fecha];

  const fechas = window.EXPLOTACION_DATA_DATES || Object.keys(dataset).sort();
  if (!fechas.length) throw new Error('No se han cargado datos de Explotación.');

  let low = 0;
  let high = fechas.length - 1;
  let previous = fechas[0];
  while (low <= high) {
    const middle = (low + high) >> 1;
    if (fechas[middle] <= fecha) {
      previous = fechas[middle];
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }
  return dataset[previous];
}

const $ = (selector) => document.querySelector(selector);
const numberFormatters = new Map();
function fmt(value, digits = 2) {
  if (!numberFormatters.has(digits)) {
    numberFormatters.set(digits, new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    }));
  }
  return numberFormatters.get(digits).format(Number(value));
}

function damImage(value) {
  return value > 0 ? '../ICONOS/PresaON.gif' : '../ICONOS/PresaOFF.gif';
}

function ellipsePoint(cx, cy, rx, ry, angle) {
  const radians = angle * Math.PI / 180;
  return {
    x: cx + rx * Math.cos(radians),
    y: cy + ry * Math.sin(radians)
  };
}

function ellipseSectorPath(cx, cy, rx, ry, startAngle, endAngle) {
  const start = ellipsePoint(cx, cy, rx, ry, startAngle);
  const end = ellipsePoint(cx, cy, rx, ry, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${rx} ${ry} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
}

function frontArcSegments(startAngle, endAngle) {
  const segments = [];
  for (let turn = -1; turn <= 2; turn += 1) {
    const frontStart = turn * 360;
    const frontEnd = frontStart + 180;
    const start = Math.max(startAngle, frontStart);
    const end = Math.min(endAngle, frontEnd);
    if (end > start) segments.push([start, end]);
  }
  return segments;
}

function ellipseSidePath(cx, cy, rx, ry, startAngle, endAngle, depth) {
  const topStart = ellipsePoint(cx, cy, rx, ry, startAngle);
  const topEnd = ellipsePoint(cx, cy, rx, ry, endAngle);
  const bottomStart = ellipsePoint(cx, cy + depth, rx, ry, startAngle);
  const bottomEnd = ellipsePoint(cx, cy + depth, rx, ry, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${topStart.x} ${topStart.y}
    A ${rx} ${ry} 0 ${largeArc} 1 ${topEnd.x} ${topEnd.y}
    L ${bottomEnd.x} ${bottomEnd.y}
    A ${rx} ${ry} 0 ${largeArc} 0 ${bottomStart.x} ${bottomStart.y}
    Z`;
}

function renderDailyPie(items) {
  const colors = [
    { face: '#5b9bd5', side: '#356b99' },
    { face: '#d8b9e8', side: '#9d7bb1' },
    { face: '#f47b20', side: '#ac4708' }
  ];
  const cx = 160;
  const cy = 68;
  const rx = 116;
  const ry = 52;
  const depth = 18;
  const total = items.reduce((sum, item) => sum + item.daily, 0);
  let angle = -90;
  const sectors = items.map((item, index) => {
    const sweep = item.daily / total * 360;
    const sector = { item, index, start: angle, end: angle + sweep, middle: angle + sweep / 2 };
    angle += sweep;
    return sector;
  });

  const sidePaths = sectors.map(sector =>
    frontArcSegments(sector.start, sector.end).map(([start, end]) => `
      <path class="pie-side" d="${ellipseSidePath(cx, cy, rx, ry, start, end, depth)}" fill="${colors[sector.index].side}"></path>`).join('')
  ).join('');

  const topPaths = sectors.map(sector => `
    <path class="pie-top-sector" d="${ellipseSectorPath(cx, cy, rx, ry, sector.start, sector.end)}" fill="${colors[sector.index].face}"></path>`).join('');

  const labels = sectors.map(sector => {
    const radius = sector.item.daily / total > 0.5 ? 0.48 : 0.64;
    const point = ellipsePoint(cx, cy, rx * radius, ry * radius, sector.middle);
    return `<text class="pie-number" x="${point.x.toFixed(1)}" y="${point.y.toFixed(1)}">${sector.item.daily}</text>`;
  }).join('');

  $('#dailyCaptureChart').innerHTML = `
    <svg class="daily-pie-svg" viewBox="0 0 320 154" role="img" aria-label="Captación diaria por origen">
      <g class="pie-sides">${sidePaths}</g>
      <g class="pie-top">${topPaths}</g>
      <g class="pie-labels">${labels}</g>
    </svg>`;
}

function renderCapture() {
  $('#capturePeriod').textContent = EXPLOTACION_DATA.capturePeriod;
  $('#dailyCaptureTitle').textContent = `CAPTADO EL ${EXPLOTACION_DATA.dailyCaptureDate} (dam³/día)`;

  $('#captureList').innerHTML = EXPLOTACION_DATA.capture.map(item => `
    <div class="capture-item">
      <strong>${fmt(item.value, 1)}</strong>
      <small>${item.name}</small>
      <img src="${damImage(item.value)}" alt="Presa ${item.value > 0 ? 'con captación' : 'sin captación'}">
    </div>`).join('');

  const total = EXPLOTACION_DATA.capture.reduce((sum, item) => sum + item.value, 0);
  $('#captureTotal').textContent = fmt(total, 1);

  renderDailyPie(EXPLOTACION_DATA.capture);

  $('#dailyCaptureLegend').innerHTML = `
    <span class="minilla"><i></i>Minilla</span>
    <span class="gergal"><i></i>Gergal</span>
    <span class="melonares"><i></i>Balsa de <br>Melonares</span>`;
}
const ENERGY_TURBINE_SVG = `<svg class="energy-turbine" viewBox="0 0 60 60" aria-hidden="true">
    <circle class="energy-turbine-ring" cx="30" cy="30" r="26"></circle>
    <path class="energy-turbine-blade" d="M30 28C17 25 13 16 16 11c10 1 16 7 17 16Z"></path>
    <path class="energy-turbine-blade" d="M32 30c3-13 12-17 17-14-1 10-7 16-16 17Z"></path>
    <path class="energy-turbine-blade" d="M30 32c13 3 17 12 14 17-10-1-16-7-17-16Z"></path>
    <path class="energy-turbine-blade" d="M28 30c-3 13-12 17-17 14 1-10 7-16 16-17Z"></path>
    <circle class="energy-turbine-hub" cx="30" cy="30" r="6"></circle>
  </svg>`;
function energyTurbineSvg() {
  return ENERGY_TURBINE_SVG;
}

function renderEnergy() {
  const heading = document.querySelector('.energy-card .card-heading');
  if (heading) {
    heading.classList.add('energy-heading-final');
    heading.innerHTML = `
      <h2 id="energyTitle">ENERGÍA</h2>
      <span class="energy-period-final" aria-label="Periodo de producción">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="2"></rect>
          <path d="M7 3v4M17 3v4M3 10h18"></path>
        </svg>
        ${EXPLOTACION_DATA.capturePeriod}
      </span>`;
  }

  $('#energyGrid').innerHTML = `
    <h3 class="energy-subtitle-final">PRODUCCIÓN EN MINICENTRALES</h3>
    <div class="energy-modules-final">
      ${EXPLOTACION_DATA.energy.map(item => `
        <article class="energy-module-final">
          <div class="energy-module-shell">
            <div class="energy-module-face">
              ${energyTurbineSvg()}
              <div class="energy-module-data">
                <div class="energy-value-line">
                  <strong>${fmt(item.value, 0)}</strong>
                  <small>MWh</small>
                </div>
                <span>${item.name}</span>
              </div>
            </div>
          </div>
        </article>`).join('')}
    </div>`;
}

function qualityClass(item) {
  if (item.value <= item.ok) return 'quality-ok';
  if (item.value <= item.warn) return 'quality-warn';
  return 'quality-bad';
}

function renderQuality(target, items) {
  $(target).innerHTML = items.map(item => `<div class="quality-box ${qualityClass(item)}"><small>${item.label}</small><strong>${fmt(item.value, item.value % 1 ? 2 : 0)}</strong></div>`).join('');
}

function renderTreatment() {
  $('#treatmentPeriod').textContent = EXPLOTACION_DATA.capturePeriod;
  renderQuality('#entryQuality', EXPLOTACION_DATA.qualityEntry);
  renderQuality('#outputQuality', EXPLOTACION_DATA.qualityOutput);
  $('#reactivesList').innerHTML = EXPLOTACION_DATA.reactives.map(([label,value]) => `<div class="reactive-row"><span>${label}</span><b>${value}</b></div>`).join('');
}

function siloSvg(index,item,fill) {
  const clipId = `siloClip${index}`;
  const fillHeight = 91 * fill;
  const fillY = 124 - fillHeight;
  return `<svg class="silo-svg" viewBox="0 0 120 150" role="img" aria-label="Silo de ${item.name}">
    <defs><clipPath id="${clipId}"><path d="M25 24Q60 9 95 24V105L77 127H43L25 105Z"/></clipPath></defs>
    <path class="silo-cap" d="M44 8h32v7H44zM48 15h24v5H48z"/>
    <path class="silo-shell" d="M25 24Q60 9 95 24V105L77 127H43L25 105Z"/>
    <rect class="silo-fill" x="25" y="${fillY}" width="70" height="${fillHeight + 4}" fill="${item.color}" clip-path="url(#${clipId})"/>
    <path class="silo-shine" d="M36 35v70"/>
    <path class="silo-leg" d="M34 125v19m52-19v19M29 144h10m42 0h10"/>
  </svg>`;
}

function renderSilos() {
  const stockPeriod = document.querySelector('.stock-heading span');
  if (stockPeriod) stockPeriod.textContent = EXPLOTACION_DATA.stockPeriod;
  $('#siloGrid').innerHTML = EXPLOTACION_DATA.silos.map((item,index) => {
    const fill = Math.max(.08, Math.min(1, item.currentKg / item.capacity));
    const currentDays = typeof item.currentDays === 'number' ? `${fmt(item.currentDays,1)} días` : item.currentDays;
    const forecastDays = typeof item.forecastDays === 'number' ? `${fmt(item.forecastDays,1)} días` : item.forecastDays;
    const currentLabel = typeof item.currentDays === 'number' ? 'Autonomía actual:' : 'Estado actual:';
    const forecastLabel = typeof item.forecastDays === 'number' ? 'Autonomía:' : 'Estado:';
    return `<article class="silo-card">
      <div class="silo-visual" style="--fill:${item.color};--forecast-top:${Math.round((1-item.forecastLevel)*82+10)}%">
        ${siloSvg(index,item,fill)}
        <i class="forecast-marker" aria-hidden="true"></i>
      </div>
      <div class="silo-info">
        <strong>${item.name}</strong>
        <small>Capacidad actual:</small><b>${fmt(item.currentKg,0)} kg</b>
        <small>${currentLabel}</small><b>${currentDays}</b>
        <div class="silo-forecast"><b>Previsto: ${fmt(item.forecastKg,0)} kg</b><b>${forecastLabel} ${forecastDays}</b></div>
      </div>
    </article>`;
  }).join('');
}

function gaugePoint(cx, cy, r, ratio) {
  const a = Math.PI * (1 - ratio);
  return { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) };
}

function gaugeArc(cx, cy, r, from, to) {
  const s = gaugePoint(cx, cy, r, from), e = gaugePoint(cx, cy, r, to);
  return `M ${s.x.toFixed(1)} ${s.y.toFixed(1)} A ${r} ${r} 0 0 1 ${e.x.toFixed(1)} ${e.y.toFixed(1)}`;
}

function renderGauge(g) {
  const cx = 200, cy = 172, r = 126;
  const limitRatio = Math.min(1, g.limit / g.scaleMax);
  const separatorRatio = Math.max(0, Math.min(1, limitRatio - 0.035));
  const markerRatio = Math.max(0, Math.min(1, limitRatio - 0.038));
  // La aguja avanza por tramos:
  // - de 0 a 11,9 % recorre la zona roja;
  // - de 11,9 % a 12,9 % recorre la zona verde;
  // - cuando PÉRDIDAS RED = ANR, queda horizontal.
  let valueRatio;
  if (g.losses <= g.limit) {
    valueRatio = (g.losses / g.limit) * separatorRatio;
  } else {
    const greenRange = g.anr - g.limit;
    const greenProgress = greenRange > 0
      ? (g.losses - g.limit) / greenRange
      : 1;
    valueRatio = separatorRatio + greenProgress * (1 - separatorRatio);
  }
  valueRatio = Math.max(0, Math.min(1, valueRatio));
  const tip = gaugePoint(cx, cy, 128, valueRatio);
  const base = gaugePoint(cx, cy, 108, valueRatio);
  const nx = -(tip.y - cy), ny = tip.x - cx, len = Math.hypot(nx, ny), w = 8;
  const p1 = `${(base.x + nx / len * w).toFixed(1)},${(base.y + ny / len * w).toFixed(1)}`;
  const p2 = `${(base.x - nx / len * w).toFixed(1)},${(base.y - ny / len * w).toFixed(1)}`;
  const ringWidth = 30;
  const separatorInner = gaugePoint(cx, cy, r - ringWidth / 2 - 2, separatorRatio);
  const separatorOuter = gaugePoint(cx, cy, r + ringWidth / 2 + 2, separatorRatio);
  const t0 = gaugePoint(cx, cy, r + 28, markerRatio);
  const t1 = gaugePoint(cx, cy, r + 48, markerRatio);
  $('#gaugeSvg').innerHTML = `
    <path d="${gaugeArc(cx, cy, r, 0, separatorRatio)}" fill="none" stroke="#ff616a" stroke-width="${ringWidth}"/>
    <path d="${gaugeArc(cx, cy, r, separatorRatio, 1)}" fill="none" stroke="#00a84f" stroke-width="${ringWidth}"/>
    <line x1="${separatorInner.x.toFixed(1)}" y1="${separatorInner.y.toFixed(1)}" x2="${separatorOuter.x.toFixed(1)}" y2="${separatorOuter.y.toFixed(1)}" stroke="#fff" stroke-width="5"/>
    <line x1="${cx}" y1="${cy}" x2="${base.x.toFixed(1)}" y2="${base.y.toFixed(1)}" stroke="#000" stroke-width="4"/>
    <polygon points="${tip.x.toFixed(1)},${tip.y.toFixed(1)} ${p1} ${p2}" fill="#000"/>
    <line x1="${t0.x.toFixed(1)}" y1="${t0.y.toFixed(1)}" x2="${t1.x.toFixed(1)}" y2="${t1.y.toFixed(1)}" stroke="#000" stroke-width="4"/>
    <text x="${(t1.x + 6).toFixed(1)}" y="${(t1.y - 8).toFixed(1)}" font-family="Arial,sans-serif" font-size="21.32" font-weight="900" fill="#222">${fmt(g.limit, 1)}%</text>
    <line x1="352" y1="${cy}" x2="372" y2="${cy}" stroke="#000" stroke-width="4"/>`;
}


function renderDistribution() {
  const d = EXPLOTACION_DATA.distribution;
  $('#notices').textContent = fmt(d.notices.value, 0);
  $('#noticesPeriod').textContent = d.notices.period;
  $('#breaches').textContent = fmt(d.breaches.value, 0);
  $('#breachesPeriod').textContent = d.breaches.period;
  $('#purge').textContent = fmt(d.purge.value, 2);
  $('#purgePeriod').textContent = d.purge.period;
  $('#gaugePeriod').textContent = d.gauge.period;
  $('#lossesValue').textContent = `${fmt(d.gauge.losses, 1)}%`;
  $('#anrValue').textContent = `${fmt(d.gauge.anr, 1)}%`;
  renderGauge(d.gauge);
}

function renderNotes() {
  $('#notesList').innerHTML = EXPLOTACION_DATA.notes.map(note => `<p>${note}</p>`).join('');
}

function renderAll() {
  renderCapture(); renderEnergy(); renderTreatment(); renderSilos(); renderDistribution(); renderNotes();
}




/* ===== Impresión: mismo procedimiento utilizado en Embalses ===== */
function inlinePrintStyles(source, target) {
  const computed = getComputedStyle(source);
  let cssText = '';
  for (const property of computed) {
    if (/(^|-)(inline|block)(-|$)/.test(property)) continue;
    cssText += `${property}:${computed.getPropertyValue(property)};`;
  }
  target.setAttribute('style', cssText);

  for (let index = 0; index < source.children.length; index++) {
    inlinePrintStyles(source.children[index], target.children[index]);
  }

  /* Los pseudo-elementos se convierten en elementos reales. */
  for (const pseudo of ['::before', '::after']) {
    const pseudoStyle = getComputedStyle(source, pseudo);
    if (!pseudoStyle.content || pseudoStyle.content === 'none' || pseudoStyle.content === 'normal') continue;
    const span = document.createElement('span');
    let pseudoCss = '';
    for (const property of pseudoStyle) {
      pseudoCss += `${property}:${pseudoStyle.getPropertyValue(property)};`;
    }
    span.setAttribute('style', pseudoCss);
    span.textContent = pseudoStyle.content.replace(/^["']|["']$/g, '');
    if (pseudo === '::before') target.insertBefore(span, target.firstChild);
    else target.appendChild(span);
  }
}

async function printAssetToDataUrl(source) {
  if (!source || source.startsWith('data:')) return source;
  try {
    const response = await fetch(source);
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn('No se pudo incrustar un recurso de Explotación:', source, error);
    return source;
  }
}

async function buildExplotacionPrintImage() {
  const topbar = document.querySelector('.topbar');
  const page = document.querySelector('.explotacion-page');
  if (!topbar || !page) throw new Error('No se encontró la ventana de Explotación');

  /* Se clona la geometría real de la ventana, sin modificar .main y sin
     activar ninguna regla responsive. */
  const topRect = topbar.getBoundingClientRect();
  const pageRect = page.getBoundingClientRect();
  /* El contenido visible de Explotación está limitado por el ancho de
     .explotacion-page. La topbar ocupa todo .main y añadía una franja vacía
     a la derecha del lienzo. La captura debe usar exclusivamente el ancho
     real del panel, igual que el área útil que ocupa Embalses. */
  const sourceWidth = Math.ceil(pageRect.width);
  const sourceHeight = Math.ceil(topRect.height + pageRect.height);

  const topClone = topbar.cloneNode(true);
  const pageClone = page.cloneNode(true);
  inlinePrintStyles(topbar, topClone);
  inlinePrintStyles(page, pageClone);
  topClone.querySelectorAll('.print-btn, #printBtn').forEach(element => element.remove());

  Object.assign(topClone.style, {
    boxSizing: 'border-box', width: `${sourceWidth}px`, minWidth: `${sourceWidth}px`,
    maxWidth: `${sourceWidth}px`, margin: '0', overflow: 'hidden'
  });
  Object.assign(pageClone.style, {
    boxSizing: 'border-box', width: `${sourceWidth}px`, minWidth: `${sourceWidth}px`,
    maxWidth: `${sourceWidth}px`, height: `${Math.ceil(pageRect.height)}px`,
    minHeight: `${Math.ceil(pageRect.height)}px`, margin: '0', overflow: 'hidden'
  });

  /* ETAP.svg se incorpora como imagen real con las medidas exactas del
     pseudo-elemento de la ventana original. */
  const originalEtap = page.querySelector('.etap-figure');
  const clonedEtap = pageClone.querySelector('.etap-figure');
  if (originalEtap && clonedEtap) {
    const pseudo = getComputedStyle(originalEtap, '::before');
    clonedEtap.querySelectorAll('span').forEach(span => {
      const background = span.style.backgroundImage || span.style.background || '';
      if (background.includes('ETAP.svg')) span.remove();
    });
    const etapImage = document.createElement('img');
    etapImage.alt = 'ETAP';
    etapImage.src = await printAssetToDataUrl('../ICONOS/ETAP.svg');
    etapImage.style.cssText = [
      'display:block!important','position:absolute',`left:${pseudo.left}`,
      `top:${pseudo.top}`,`width:${pseudo.width}`,`height:${pseudo.height}`,
      `transform:${pseudo.transform}`,'object-fit:fill','pointer-events:none',
      'z-index:2','max-width:none','max-height:none'
    ].join(';');
    clonedEtap.appendChild(etapImage);
  }

  await Promise.all([...pageClone.querySelectorAll('img')].map(async image => {
    image.src = await printAssetToDataUrl(image.currentSrc || image.src);
  }));

  const wrapper = document.createElement('div');
  wrapper.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  wrapper.style.cssText = `box-sizing:border-box;width:${sourceWidth}px;height:${sourceHeight}px;background:#fff;overflow:hidden;`;
  wrapper.append(topClone, pageClone);

  const serialized = new XMLSerializer().serializeToString(wrapper);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${sourceWidth}" height="${sourceHeight}" viewBox="0 0 ${sourceWidth} ${sourceHeight}"><foreignObject x="0" y="0" width="${sourceWidth}" height="${sourceHeight}">${serialized}</foreignObject></svg>`;
  const rendered = new Image();
  await new Promise((resolve, reject) => {
    rendered.onload = resolve;
    rendered.onerror = reject;
    rendered.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  });

  /* El lienzo final tiene exactamente la relación del área útil A4 usada por
     Embalses: 287 x 199 mm. Así ambas impresiones ocupan la misma superficie. */
  const outputWidth = 1722;
  const outputHeight = 1194;
  const canvas = document.createElement('canvas');
  canvas.width = outputWidth;
  canvas.height = outputHeight;
  const context = canvas.getContext('2d');
  context.fillStyle = '#fff';
  context.fillRect(0, 0, outputWidth, outputHeight);
  context.drawImage(rendered, 0, 0, sourceWidth, sourceHeight, 0, 0, outputWidth, outputHeight);
  return canvas.toDataURL('image/png');
}

async function printExplotacionView() {
  try {
    const imageUrl = await buildExplotacionPrintImage();
    let printImage = document.getElementById('printImg');
    if (!printImage) {
      printImage = document.createElement('img');
      printImage.id = 'printImg';
      printImage.alt = 'Impresión de Explotación';
      document.body.appendChild(printImage);
    }
    printImage.src = imageUrl;
    await printImage.decode();
    document.body.classList.add('print-image');
  } catch (error) {
    console.warn('Impresión como imagen no disponible; se usa impresión normal.', error);
  }
  window.print();
}

window.addEventListener('afterprint', () => document.body.classList.remove('print-image'));
$('#printBtn').addEventListener('click', printExplotacionView);

function loadExplotacionDate(fecha) {
  EXPLOTACION_DATA = selectExplotacionData(fecha);
  renderAll();
}

const fechaConsulta = $('#fecha');
const fechasExplotacion = window.EXPLOTACION_DATA_DATES || [];

if (fechaConsulta && fechasExplotacion.length) {
  fechaConsulta.min = fechasExplotacion[0];
  fechaConsulta.max = fechasExplotacion.at(-1);
  if (!window.EXPLOTACION_DATASET[fechaConsulta.value]) {
    fechaConsulta.value = fechasExplotacion.at(-1);
  }
  fechaConsulta.addEventListener('change', event => loadExplotacionDate(event.target.value));
  loadExplotacionDate(fechaConsulta.value);
} else {
  loadExplotacionDate(fechasExplotacion.at(-1));
}

window.__capturePrintPage = buildExplotacionPrintImage;
window.__nativePrintPage = printExplotacionView;
