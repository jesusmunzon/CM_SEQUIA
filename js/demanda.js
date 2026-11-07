/* ==========================================================================
   PANTALLA DEMANDA
   Dibuja DEMANDA AGUA POTABLE, COSTES SEQUÍA y ACCIONES a partir de
   data/demanda-data.js. Las semanas y las acciones se guardan en el navegador
   (localStorage) para conservarlas al recargar.
   ========================================================================== */
(() => {
  const D = DEMANDA_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const ICON = '../ICONOS/';
  const GREEN = '#00a651', RED = '#ff7b80';
  const MESES = ['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
  const numberFormatters = new Map();
  const nf = (v, d = 0) => {
    if (!numberFormatters.has(d)) {
      numberFormatters.set(d, new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: d,
        maximumFractionDigits: d
      }));
    }
    return numberFormatters.get(d).format(v);
  };
  const pc = (v, d = 2) => nf(v, d) + '%';
  const variacion = (base, actual) => base === 0 ? 0 : ((actual - base) / base) * 100;
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const arrow = (down, color, w, h, cls = '') =>
    `<svg class="dm-arrow ${cls}" width="${w}" height="${h}" viewBox="0 0 24 30" style="${down ? '' : 'transform:rotate(180deg)'}"><path d="M6 0h12v14h6L12 30 0 14h6z" fill="${color}"/></svg>`;
  const equal = (color, cls = '') => `<span class="${cls}" style="display:inline-grid;place-items:center;color:${color};font:900 24px/1 Arial,sans-serif">=</span>`;
  const sentido = v => v < 0
    ? { color: GREEN, symbol: (w=24,h=29,cls='') => arrow(true,GREEN,w,h,cls) }
    : v > 0
      ? { color: RED, symbol: (w=24,h=29,cls='') => arrow(false,RED,w,h,cls) }
      : { color: '#8a8f93', symbol: (w=24,h=29,cls='') => equal('#8a8f93',cls) };

  /* ------------------------------------------------------------------
     1. DEMANDA AGUA POTABLE
     ------------------------------------------------------------------ */
  const CAT_ICON = {
    domestico: 'Domestico_Demanda.svg',
    industrial: 'Industrial_Demanda.svg',
    oficial: 'Oficial_Demanda.svg'
  };

  function renderDemanda() {
    const d = D.demanda;
    const t = d.total;
    const tc = t.valor <= t.objetivo ? GREEN : RED;
    const totalSymbol = t.valor === t.objetivo
      ? equal(tc, 'dm-tarr')
      : t.valor < 0
        ? arrow(true, tc, 22, 28, 'dm-tarr')
        : t.valor > 0
          ? arrow(false, tc, 22, 28, 'dm-tarr')
          : equal(tc, 'dm-tarr');
    let h = '';
    h += `<div class="dm-subt">Comparativa ${d.comparativa} respecto a ${d.base} para el periodo ${esc(d.periodo)}</div>`;
    h += `<img class="dm-tot-bg" src="${ICON}Total_Demanda.svg" alt="">`;
    h += `<div class="dm-tl">TOTAL</div>`;
    h += `<div class="dm-tv" style="color:${tc}">${pc(t.valor)}</div>`;
    h += totalSymbol;
    h += `<div class="dm-tobj">OBJETIVO: – ${nf(Math.abs(t.objetivo))} %</div>`;

    d.categorias.forEach(c => {
      const s = sentido(c.valor);
      const file = CAT_ICON[c.id];
      h += `<div class="dm-cat ${c.id}">
        <div class="dm-bloque"><img src="${ICON}Bloque_Demanda.svg" alt=""><i class="h"></i><i class="t"></i><i class="f"></i></div>
        <b class="dm-ct">${esc(c.nombre)}</b>
        <img class="dm-ci" src="${ICON}${file}" alt="">
        ${s.symbol()}
        <div class="dm-cv" style="color:${s.color}">${pc(c.valor)}</div></div>`;
    });

    h += `<svg class="dm-bend" width="60" height="55" viewBox="0 0 60 55"><path d="M8 0v28q0 14 14 14h14" fill="none" stroke="#4FC1CF" stroke-width="8"/><path d="M34 28l22 14-22 14z" fill="#4FC1CF"/></svg>`;

    d.subtipos.forEach((s, i) => {
      const porcentaje = variacion(s.base, s.actual);
      const a = sentido(porcentaje);
      h += `<div class="dm-sub dm-sub-${i + 1}">
        <img src="${ICON}Individual_Demanda.svg" alt="">
        <div class="dm-st">${esc(s.nombre)}</div>
        <div class="dm-sp" style="color:${a.color}">${pc(porcentaje)}${a.symbol(12,15)}</div>
        <div class="dm-n1">${nf(s.base, 1)}</div><div class="dm-n2">${nf(s.actual, 1)}</div></div>`;
    });
    h += `<div class="dm-lab">(l/hab/día)</div>`;
    h += `<div class="dm-pb"></div><div class="dm-ph">CONSUMO UNITARIO DOMÉSTICO ANUAL (l/hab/día)</div>`;

    d.consumoAnual.slice(0, 4).forEach((c, i) => {
      h += `<div class="dm-cal dm-cal-${i + 1}"><img src="${ICON}Calendario_Demanda.svg" alt="">
        <div class="dm-cy">${c.anio}</div><div class="dm-cn">${nf(c.valor, 1)}</div></div>`;
      const sig = d.consumoAnual[i + 1];
      if (sig && sig.anio - c.anio > 1) {
        h += `<svg class="dm-gap dm-gap-${i + 1}" width="26" height="40" viewBox="0 0 26 40"><rect x="10" y="0" width="6" height="40" fill="#6a3d9a"/><path d="M0 20l9-8v16zM26 20l-9-8v16z" fill="#6a3d9a"/></svg>`;
      }
    });
    $('#dmStage').innerHTML = h;
    fitStage();
  }

  function fitStage() {
    const w = $('#dmStageWrap'), st = $('#dmStage');
    const s = Math.min(w.clientWidth / 540, w.clientHeight / 500);
    if (!(s > 0)) return;
    st.style.transform = `scale(${s})`;
    st.style.left = (w.clientWidth - 540 * s) / 2 + 'px';
    st.style.top = (w.clientHeight - 492 * s) / 2 + 'px';
  }

  /* ------------------------------------------------------------------
     2. COSTES SEQUÍA
     ------------------------------------------------------------------ */
  function renderCostes() {
    const c = D.costes;
    const pct = x => (x.presupuesto > 0 ? Math.max(0, Math.min(100, (x.incurrido / x.presupuesto) * 100)) : 0);
    let h = '<div></div>' + c.anios.map((a, i) => `<div class="dm-ch c${i}">${a}</div>`).join('');
    c.filas.forEach(f => {
      h += `<div class="dm-cl">${esc(f.nombre)}${f.detalle ? `<small>${esc(f.detalle)}</small>` : ''}</div>`;
      f.datos.forEach(x => {
        const p = pct(x);
        h += `<div class="dm-cc" title="Incurrido ${nf(x.incurrido, 2)}M de ${nf(x.presupuesto, 2)}M"><div class="fill" style="width:${p}%"></div><span class="v">${nf(x.presupuesto, 1)}M</span><em>${Math.round(p)}%</em></div>`;
      });
    });
    h += `<div class="dm-cl tot">TOTAL</div>`;
    c.anios.forEach((a, i) => {
      const pres = c.filas.reduce((s, f) => s + f.datos[i].presupuesto, 0);
      const inc = c.filas.reduce((s, f) => s + f.datos[i].incurrido, 0);
      const p = pres > 0 ? (inc / pres) * 100 : 0;
      h += `<div class="dm-cc tot"><div class="fill" style="width:${p}%"></div><span class="v">${nf(pres, 1)}M</span><em>${Math.round(p)}%</em></div>`;
    });
    $('#dmCostes').innerHTML = h;
    $('#dmCostesNota').textContent = c.nota || '';
  }

  /* ------------------------------------------------------------------
     3. ACCIONES  (estado guardado en localStorage)
     ------------------------------------------------------------------ */
  const KEY = 'cuadroSequia.demanda.acciones.v1';
  const A = D.acciones;
  let st = (() => {
    try { const g = JSON.parse(localStorage.getItem(KEY)); if (g && g.semanas && g.listado) return g; } catch (e) {}
    return { anio: A.anioInicial, mes: A.mesInicial, semanas: { ...A.semanasIniciales }, listado: A.listado.map(x => ({ ...x })) };
  })();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) {} };

  // Semana ISO de una fecha (AAAA-MM-DD)
  function isoWeek(str) {
    if (!str) return null;
    const [y, m, d] = str.split('-').map(Number);
    const t = new Date(Date.UTC(y, m - 1, d));
    t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
    const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
    return { week: Math.ceil(((t - y0) / 86400000 + 1) / 7), year: t.getUTCFullYear() };
  }
  // Semanas ISO cuyo jueves cae en el mes indicado (criterio habitual de reparto de semanas)
  const weeksByMonth = new Map();
  function semanasDelMes(anio, mes) {
    const key = `${anio}-${mes}`;
    if (weeksByMonth.has(key)) return weeksByMonth.get(key);

    const out = new Set();
    for (let d = new Date(Date.UTC(anio, mes, 1)); d.getUTCMonth() === mes; d.setUTCDate(d.getUTCDate() + 1)) {
      if ((d.getUTCDay() || 7) === 4) {
        const w = isoWeek(d.toISOString().slice(0, 10));
        out.add(w.week);
      }
    }
    const weeks = [...out].sort((a, b) => a - b);
    weeksByMonth.set(key, weeks);
    return weeks;
  }

  function renderSemanas() {
    const meses = Array.from({ length: 9 }, (_, offset) => {
      const date = new Date(st.anio, st.mes - 1 + offset, 1);
      return { anio: date.getFullYear(), mes: date.getMonth() };
    });

    $('#dmMonths').classList.remove('many');
    $('#dmMonths').innerHTML = meses.map(({ anio, mes }) => {
      const weeks = semanasDelMes(anio, mes);
      return `
      <div class="dm-month"><div class="dm-mh">${MESES[mes]} ${anio}</div>
      <div class="dm-wk${weeks.length === 4 ? ' w4' : ''}">${weeks.map(w => {
        const key = `${anio}-${w}`;
        const v = st.semanas[key] || 0;
        return `<button type="button" class="dm-w ${v ? 's' + v : ''}" data-k="${key}" title="Clic: cambia la importancia">Semana<b>${w}</b></button>`;
      }).join('')}</div></div>`;
    }).join('');
  }

  const fSem = f => { const w = isoWeek(f); return w ? `S${w.week} (${w.year})` : '∅'; };
  function fImporte(a) {
    if (a.importe == null || a.importe === '') return '—';
    return `${nf(+a.importe, Number.isInteger(+a.importe) ? 0 : 1)}${a.unidad ? `<small>${esc(a.unidad)}</small>` : ''}`;
  }
  function rowHTML(a) {
    const [n, y] = a.inicio ? fSem(a.inicio).replace(')', '').split(' (') : ['∅', ''];
    const fin = a.fin ? fSem(a.fin).replace(')', '').split(' (') : null;
    const cell = (n, y) => y ? `${n}<small>(${y})</small>` : n;
    return `<div class="dm-row" data-id="${a.id}" title="Clic para editar">
      <div class="d">${cell(n, y)}</div><div class="d">${fin ? cell(fin[0], fin[1]) : ''}</div>
      <div class="a">${esc(a.accion)}</div><div class="i">${fImporte(a)}</div></div>`;
  }
  function renderAgenda() {
    const L = st.listado.slice(0, 7), R = st.listado.slice(7);
    $('#dmRowsL').innerHTML = L.map(rowHTML).join('');
    $('#dmRowsR').innerHTML = R.map(rowHTML).join('');
  }
  function renderAcciones() { renderSemanas(); renderAgenda(); }

  function initControls() {
    $('#dmAnio').innerHTML = A.anios.map(a => `<option ${a === st.anio ? 'selected' : ''}>${a}</option>`).join('');
    $('#dmMes').innerHTML = MESES.map((m, i) => `<option value="${i + 1}" ${i + 1 === st.mes ? 'selected' : ''}>${m[0] + m.slice(1).toLowerCase()}</option>`).join('');
    $('#dmAnio').addEventListener('change', e => { st.anio = +e.target.value; save(); renderSemanas(); });
    $('#dmMes').addEventListener('change', e => { st.mes = +e.target.value; save(); renderSemanas(); });
    $('#dmMonths').addEventListener('click', e => {
      const b = e.target.closest('.dm-w'); if (!b) return;
      const k = b.dataset.k, v = ((st.semanas[k] || 0) + 1) % 4;
      if (v) st.semanas[k] = v; else delete st.semanas[k];
      b.className = 'dm-w' + (v ? ' s' + v : '');
      save();
    });

    // Diálogo de acción formativa
    const dlg = $('#dmDialog'); let editId = null;
    const open = a => {
      editId = a ? a.id : null;
      $('#dmDialogTitle').textContent = a ? 'Editar acción formativa' : 'Nueva acción formativa';
      $('#fAccion').value = a ? a.accion : '';
      $('#fInicio').value = a ? a.inicio : '';
      $('#fFin').value = a ? a.fin : '';
      $('#fImporte').value = a && a.importe != null ? a.importe : '';
      $('#fUnidad').value = a ? a.unidad : 'millones';
      $('#fEliminar').style.visibility = a ? 'visible' : 'hidden';
      dlg.showModal();
    };
    $('#dmAdd').addEventListener('click', () => open(null));
    $('#dmNotebook').addEventListener('click', e => {
      const r = e.target.closest('.dm-row'); if (!r) return;
      const a = st.listado.find(x => x.id == r.dataset.id); if (a) open(a);
    });
    $('#fCancelar').addEventListener('click', () => dlg.close());
    $('#fEliminar').addEventListener('click', () => {
      st.listado = st.listado.filter(x => x.id !== editId); save(); renderAgenda(); dlg.close();
    });
    $('#dmForm').addEventListener('submit', e => {
      e.preventDefault();
      const imp = $('#fImporte').value;
      const a = { id: editId ?? Date.now(), accion: $('#fAccion').value.trim(), inicio: $('#fInicio').value, fin: $('#fFin').value,
                  importe: imp === '' ? null : +imp, unidad: $('#fUnidad').value };
      if (!a.accion) return;
      if (editId != null) st.listado = st.listado.map(x => (x.id === editId ? a : x));
      else {
        // se inserta por fecha de inicio entre las acciones con fecha
        let i = st.listado.findIndex(x => x.inicio && a.inicio && x.inicio > a.inicio);
        if (i < 0) i = st.listado.length;
        st.listado.splice(i, 0, a);
      }
      save(); renderAgenda(); dlg.close();
    });
  }

  /* ------------------------------------------------------------------ */
  const dateInput = $('#fecha');
  const availableDates = window.DEMANDA_DATA_DATES || [];
  const demandForDate = fecha => {
    if (window.DEMANDA_DATASET[fecha]) return window.DEMANDA_DATASET[fecha];
    const previous = availableDates.filter(item => item <= fecha).at(-1);
    return window.DEMANDA_DATASET[previous || availableDates[0]];
  };

  dateInput.min = availableDates[0];
  dateInput.max = availableDates.at(-1);
  if (!window.DEMANDA_DATASET[dateInput.value]) dateInput.value = '2023-11-07';
  D.demanda = demandForDate(dateInput.value);

  renderDemanda(); renderCostes(); initControls(); renderAcciones();
  dateInput.addEventListener('change', event => {
    D.demanda = demandForDate(event.target.value);
    renderDemanda();
    window.dispatchEvent(new Event('demanda:rendered'));
  });

  /* Antes de capturar para imprimir se espera a fuentes, SVG/imágenes y al
     ajuste responsive. Evita que la primera impresión se mida a medio render. */
  window.__prepareDemandaPrint = async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    await Promise.all([...document.images].map(image => {
      if (image.complete) return (image.naturalWidth && image.decode) ? image.decode().catch(() => {}) : Promise.resolve();
      return new Promise(resolve => {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
        setTimeout(resolve, 5000);
      });
    }));
    fitStage();
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    fitStage();
    await new Promise(resolve => setTimeout(resolve, 80));
  };

  new ResizeObserver(fitStage).observe($('#dmStageWrap'));
  window.addEventListener('beforeprint', fitStage);
  window.addEventListener('afterprint', fitStage);
})();

/* ==========================================================================
   IMPRESIÓN POR IMAGEN (igual que Embalses y Actuaciones)
   Al pulsar Imprimir se genera una imagen del encabezado + la pantalla tal como
   se ve, se oculta el resto de la página y solo se imprime esa imagen en A4
   horizontal. La imagen se guarda mientras no cambie nada, así que la segunda
   impresión es instantánea.
   ========================================================================== */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const dataCache = new Map();

  function toDataUrl(img) {
    const src = img.currentSrc || img.src;
    if (!src || src.startsWith('data:')) return Promise.resolve(src);
    /* 1) Icono ya incrustado en data/iconos-inline.js: sin red, sin fetch, siempre disponible */
    const nombre = decodeURIComponent(src.split('?')[0].split('/').pop());
    const incrustado = window.ICONOS_INLINE && window.ICONOS_INLINE[nombre];
    if (incrustado) return Promise.resolve(incrustado);
    if (!dataCache.has(src)) {
      const tarea = fetch(src, { cache: 'force-cache' })
        .then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.blob(); })
        .then(b => new Promise((ok, fail) => { const f = new FileReader(); f.onload = () => ok(f.result); f.onerror = fail; f.readAsDataURL(b); }))
        .catch(() => {
          const cv = document.createElement('canvas');
          cv.width = img.naturalWidth || 200; cv.height = img.naturalHeight || 200;
          cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
          return cv.toDataURL('image/png');   // si el lienzo está contaminado lanza error: la captura se reintenta
        });
      /* un fallo NO se guarda en caché: el siguiente intento vuelve a probar */
      tarea.catch(() => dataCache.delete(src));
      dataCache.set(src, tarea);
    }
    return dataCache.get(src);
  }

  /* Copia los estilos calculados de cada elemento: la imagen se ve igual que la pantalla */
  function inlineStyles(src, dst) {
    const cs = getComputedStyle(src);
    let s = '';
    /* Se copian solo las propiedades físicas: las lógicas (margin-inline-start…) pisan al margin-left
       que se fuerza a 0 y desplazaban la captura en monitores anchos. */
    for (const p of cs) { if (/(^|-)(inline|block)(-|$)/.test(p)) continue; s += p + ':' + cs.getPropertyValue(p) + ';'; }
    dst.setAttribute('style', s);
    for (let i = 0; i < src.children.length; i++) inlineStyles(src.children[i], dst.children[i]);
  }

  async function buildPrintImage() {
    if (typeof window.__prepareDemandaPrint === 'function') {
      await window.__prepareDemandaPrint();
    }
    const top = $('.topbar'), page = $('.demanda-page');
    if (!top || !page) throw new Error('No se encontró la pantalla Demanda');
    const r1 = top.getBoundingClientRect(), r2 = page.getBoundingClientRect();
    /* El ancho de la imagen es el de la propia pantalla (max-width 1500 px), sin los márgenes
       laterales que deja en monitores anchos: así la imagen llena la hoja al imprimir. */
    const W = Math.ceil(r2.width), H = Math.ceil(r2.bottom - r1.top);

    const t = top.cloneNode(true), p = page.cloneNode(true);
    inlineStyles(top, t); inlineStyles(page, p);
    Object.assign(t.style, { width: W + 'px', minWidth: '0', maxWidth: 'none', flex: 'none' });
    Object.assign(p.style, { marginLeft: '0', marginRight: '0', width: W + 'px' });

    /* Controles del encabezado (si los hay) → texto */
    const oc = [...top.querySelectorAll('input,select,textarea')], cc = [...t.querySelectorAll('input,select,textarea')];
    oc.forEach((o, i) => {
      const sp = document.createElement('span');
      sp.setAttribute('style', cc[i].getAttribute('style')); sp.style.display = 'inline-block';
      sp.textContent = o.tagName === 'SELECT' ? (o.selectedOptions[0]?.text || '')
        : (o.type === 'date' && o.value ? new Date(o.value + 'T00:00:00').toLocaleDateString('es-ES') : o.value);
      cc[i].replaceWith(sp);
    });

    /* Sin controles de edición en papel (se mantiene la leyenda de colores de las semanas) */
    p.querySelectorAll('.dm-add').forEach(e => { e.style.visibility = 'hidden'; });
    p.querySelectorAll('.dm-weeks-tools > :not(.dm-legend)').forEach(e => { e.style.visibility = 'hidden'; });
    p.querySelectorAll('.dm-months').forEach(e => { e.style.overflow = 'visible'; });
    p.querySelectorAll('.dm-rows').forEach(e => { e.style.overflow = 'hidden'; });

    /* Iconos incrustados: una imagen SVG no puede cargar archivos externos */
    const oi = [...page.querySelectorAll('img')], ci = [...p.querySelectorAll('img')];
    await Promise.all(ci.map(async (im, i) => im.setAttribute('src', await toDataUrl(oi[i]))));

    const wrap = document.createElement('div');
    wrap.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    wrap.setAttribute('style', `box-sizing:border-box;position:relative;width:${W}px;height:${H}px;background:#fff;overflow:hidden;`);
    wrap.append(t, p);
    const xml = new XMLSerializer().serializeToString(wrap);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><foreignObject x="0" y="0" width="${W}" height="${H}">${xml}</foreignObject></svg>`;
    const image = new Image();
    await new Promise((ok, fail) => { image.onload = ok; image.onerror = fail; image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg); });

    /* Lienzo final idéntico al utilizado en Embalses y Actuaciones:
       área útil A4 horizontal de 287 x 199 mm a 6 px/mm. De este modo,
       Demanda ocupa toda la misma superficie, sin franja blanca inferior. */
    const outputWidth = 1722;
    const outputHeight = 1194;
    const cv = document.createElement('canvas');
    cv.width = outputWidth;
    cv.height = outputHeight;
    const cx = cv.getContext('2d');
    cx.fillStyle = '#fff';
    cx.fillRect(0, 0, outputWidth, outputHeight);
    cx.drawImage(image, 0, 0, W, H, 0, 0, outputWidth, outputHeight);
    return cv.toDataURL('image/png');
  }

  let last = { sig: '', src: '' };
  const clearPrintCache = () => { last = { sig: '', src: '' }; };
  window.addEventListener('demanda:rendered', clearPrintCache);
  window.addEventListener('resize', clearPrintCache);
  async function printView(event) {
    event?.preventDefault();
    try {
      const page = $('.demanda-page');
      const sig = (page ? page.innerHTML : '') + '|' + innerWidth + 'x' + innerHeight;
      const src = (last.sig === sig && last.src) ? last.src : await buildPrintImage();
      last = { sig, src };
      let img = document.getElementById('printDemandaImg');
      if (!img) { img = document.createElement('img'); img.id = 'printDemandaImg'; img.alt = 'Demanda'; document.body.appendChild(img); }
      img.src = src;
      if (img.decode) await img.decode();
      document.body.classList.add('print-demanda-image');
      await new Promise(ok => requestAnimationFrame(() => requestAnimationFrame(ok)));
      window.print();
    } catch (error) {
      console.warn('Impresión como imagen no disponible, se usa la impresión normal', error);
      window.print();
    }
  }
  window.addEventListener('afterprint', () => document.body.classList.remove('print-demanda-image'));

  const bind = () => { const b = document.getElementById('printBtn') || $('.print-btn'); if (b) b.onclick = printView; };
  bind();
  window.__capturePrintPage = buildPrintImage;
  window.__nativePrintPage = printView;
})();
