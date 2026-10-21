const EXPLOTACION_DATA = {
  capturePeriod: '01/10/2023 – 01/11/2023',
  dailyCaptureDate: '07/11/2023',
  capture: [
    { name: 'MINILLA', value: 3.0, daily: 69 },
    { name: 'GERGAL', value: 0.2, daily: 35 },
    { name: 'BALSA DE MELONARES', value: 5.2, daily: 173 }
  ],
  energy: [
    { name: 'ARACENA', value: 0 },
    { name: 'ZUFRE', value: 0 },
    { name: 'MINILLA', value: 3 }
  ],
  qualityEntry: [
    { label: 'Turbidez (NTU)', value: 4.44, ok: 5, warn: 8 },
    { label: 'Materia orgánica UV254 (m-1)', value: 3.18, ok: 3, warn: 4 },
    { label: 'Temperatura (°C)', value: 20.9, ok: 18, warn: 22 }
  ],
  reactives: [
    ['Sulfato (ppm)', '83'], ['Cloro (ppm)', '2,6'], ['Carbón activo (ppm)', '0'], ['Polvo (ppm)', 'Parado']
  ],
  qualityOutput: [
    { label: 'Turbidez (NTU)', value: 0.11, ok: 0.5, warn: 1 },
    { label: 'Materia orgánica UV254 (m-1)', value: 3.38, ok: 3, warn: 4 },
    { label: 'THM (µg/l)', value: 36, ok: 50, warn: 80 }
  ],
  silos: [
    { name:'SULFATO', kg:30213, max:40000, days:19.8, marker:8074, color:'#becfe0' },
    { name:'CLORO', kg:6774, max:8000, days:12, marker:2000, color:'#f3e3b6' },
    { name:'CARBÓN ACTIVO', kg:66131, max:80000, days:'Parado', marker:6131, color:'#cfd1d0' }
  ],
  distribution: { municipalities:30, breaches:0, efficiency:52.78, pressure:{min:11.9,max:12.9,value:12.9} },
  notes: [
    'Datos de ANR y pérdidas en red correspondientes a los nueve primeros meses del año, donde el volumen facturado alcanza el 90%.',
    'De los 400 hm³ de capacidad total, 300 hm³ se han repartido. Queda pendiente recibir una segunda distribución.'
  ]
};

const $ = (selector) => document.querySelector(selector);
const fmt = (value, digits = 2) => Number(value).toLocaleString('es-ES', { minimumFractionDigits: digits, maximumFractionDigits: digits });

function damImage(value) {
  return value > 0 ? '../PresaON.gif' : '../PresaOFF.gif';
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
function energyTurbineSvg() {
  return `<svg class="energy-turbine" viewBox="0 0 60 60" aria-hidden="true">
    <circle class="energy-turbine-ring" cx="30" cy="30" r="26"></circle>
    <path class="energy-turbine-blade" d="M30 28C17 25 13 16 16 11c10 1 16 7 17 16Z"></path>
    <path class="energy-turbine-blade" d="M32 30c3-13 12-17 17-14-1 10-7 16-16 17Z"></path>
    <path class="energy-turbine-blade" d="M30 32c13 3 17 12 14 17-10-1-16-7-17-16Z"></path>
    <path class="energy-turbine-blade" d="M28 30c-3 13-12 17-17 14 1-10 7-16 16-17Z"></path>
    <circle class="energy-turbine-hub" cx="30" cy="30" r="6"></circle>
  </svg>`;
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
  renderQuality('#entryQuality', EXPLOTACION_DATA.qualityEntry);
  renderQuality('#outputQuality', EXPLOTACION_DATA.qualityOutput);
  $('#reactivesList').innerHTML = EXPLOTACION_DATA.reactives.map(([label,value]) => `<div class="reactive-row"><span>${label}</span><b>${value}</b></div>`).join('');
}

function siloSvg(index,item,fill) {
  const fillHeight = 92 * fill;
  const y = 118 - fillHeight;
  const clipId = `siloClip${index}`;
  return `<svg class="silo-svg" viewBox="0 0 120 150" aria-label="Silo de ${item.name}">
    <defs><clipPath id="${clipId}"><path d="M18 18Q60 3 102 18V111L83 139H37L18 111Z"/></clipPath></defs>
    <path class="silo-shell" d="M18 18Q60 3 102 18V111L83 139H37L18 111Z"/>
    <rect x="18" y="${y}" width="84" height="${fillHeight + 22}" fill="${item.color}" clip-path="url(#${clipId})"/>
    <ellipse cx="60" cy="18" rx="42" ry="11" fill="#fff" stroke="#626f75" stroke-width="2.5"/>
    <path d="M34 139v8M86 139v8M50 139v8M70 139v8" stroke="#626f75" stroke-width="3"/>
  </svg>`;
}

function renderSilos() {
  $('#siloGrid').innerHTML = EXPLOTACION_DATA.silos.map((item,index) => {
    const fill = Math.max(.08, Math.min(1, item.kg / item.max));
    const labelTop = Math.max(15, 100 - fill * 82);
    const days = typeof item.days === 'number' ? `${fmt(item.days,1)} días` : item.days;
    return `<article class="silo-card">
      <div class="silo-visual" style="--label-top:${labelTop}%">
        ${siloSvg(index,item,fill)}
        <div class="silo-label"><span>◆ ${fmt(item.kg,0)} kg</span><span>◆ ${days}</span></div>
      </div>
      <div class="silo-info"><strong>${item.name}</strong><small>Indicador: ${fmt(item.marker,0)} kg</small><small>${days} de autonomía</small></div>
    </article>`;
  }).join('');
}

function renderDistribution() {
  const dist = EXPLOTACION_DATA.distribution;
  $('#municipalities').textContent = dist.municipalities;
  $('#breaches').textContent = dist.breaches;
  $('#efficiency').textContent = fmt(dist.efficiency,2);
  $('#pressureMin').textContent = fmt(dist.pressure.min,1);
  $('#pressureMax').textContent = fmt(dist.pressure.max,1);
  $('#pressureValue').textContent = fmt(dist.pressure.value,1);
  const ratio = Math.max(0, Math.min(1, (dist.pressure.value - dist.pressure.min) / (dist.pressure.max - dist.pressure.min || 1)));
  $('#pressureNeedle').style.transform = `rotate(${-88 + ratio * 176}deg)`;
}

function renderNotes() {
  $('#notesList').innerHTML = EXPLOTACION_DATA.notes.map(note => `<li>${note}</li>`).join('');
}

function renderAll() {
  renderCapture(); renderEnergy(); renderTreatment(); renderSilos(); renderDistribution(); renderNotes();
}

$('#printBtn').addEventListener('click', () => window.print());
renderAll();
