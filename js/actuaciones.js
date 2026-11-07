(() => {
  'use strict';

  const DATA = window.ACTUACIONES_DATA;
  const monthNames = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
  const phases = [
    { key: 'proyecto', color: '#61c548' },
    { key: 'licitacion', color: '#ffc107' },
    { key: 'obra', color: '#2494ee' }
  ];
  const euroFormatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  });

  let monthShift = 0;
  let ui;

  const esc = (value = '') => String(value).replace(/[&<>'"]/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[character]);
  const parseDate = value => value ? new Date(`${value}T00:00:00`) : null;
  const money = value => euroFormatter.format(Number(value) || 0);

  function months() {
    const base = parseDate(DATA.inicioCronograma);
    return Array.from({ length: DATA.mesesVisibles }, (_, index) => {
      const date = new Date(base.getFullYear(), base.getMonth() + index + monthShift, 1);
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        label: monthNames[date.getMonth()]
      };
    });
  }

  function fill(month, range) {
    const start = parseDate(range?.[0]);
    const end = parseDate(range?.[1]);
    if (!start || !end) return null;

    const monthStart = new Date(month.year, month.month, 1);
    const monthEnd = new Date(month.year, month.month + 1, 0);
    if (end < monthStart || start > monthEnd) return null;

    const visibleStart = start > monthStart ? start : monthStart;
    const visibleEnd = end < monthEnd ? end : monthEnd;
    const days = monthEnd.getDate();

    return {
      left: ((visibleStart.getDate() - 1) / days) * 100,
      width: ((visibleEnd.getDate() - visibleStart.getDate() + 1) / days) * 100
    };
  }

  function renderGantt() {
    const visibleMonths = months();
    const groups = [];
    const today = new Date();
    const html = [];

    visibleMonths.forEach(month => {
      const previous = groups.at(-1);
      if (previous?.year === month.year) previous.count++;
      else groups.push({ year: month.year, count: 1 });
    });

    html.push('<table class="act-table"><thead><tr><th class="sticky act-name" rowspan="2">Actuación</th><th class="sticky act-owner" rowspan="2">Responsable</th><th class="sticky act-budget" rowspan="2">Presupuesto<br>con IVA</th>');
    groups.forEach(group => html.push(`<th colspan="${group.count}" class="year-head">${group.year}</th>`));
    html.push('</tr><tr>');
    visibleMonths.forEach(month => html.push(`<th class="month-head">${month.label}</th>`));
    html.push('</tr></thead><tbody>');

    DATA.actuaciones.forEach(action => {
      html.push(`<tr><td class="sticky act-name"><button class="act-link" data-id="${action.id}">${esc(action.nombre)}</button></td><td class="sticky act-owner">${esc(action.responsable)}</td><td class="sticky act-budget">${money(action.presupuesto)}</td>`);

      visibleMonths.forEach((month, index) => {
        const yearBreak = index > 0 && visibleMonths[index - 1].year !== month.year;
        const bars = [];

        phases.forEach(phase => {
          const position = fill(month, action[phase.key]);
          if (position) {
            bars.push(`<span class="phase-bar" style="--left:${position.left}%;--width:${position.width}%;--bar:${phase.color}"></span>`);
          }
        });

        let todayLine = '';
        if (month.year === today.getFullYear() && month.month === today.getMonth()) {
          const days = new Date(month.year, month.month + 1, 0).getDate();
          todayLine = `<i class="today-line" style="left:${((today.getDate() - .5) / days) * 100}%"></i>`;
        }

        html.push(`<td class="month-cell ${yearBreak ? 'year-break' : ''}">${bars.join('')}${todayLine}</td>`);
      });

      html.push('</tr>');
    });

    html.push('</tbody></table>');
    ui.gantt.innerHTML = html.join('');
  }

  function openModal(id = null) {
    const action = DATA.actuaciones.find(item => item.id === id);
    ui.modalTitle.textContent = action ? 'Editar actuación' : 'Nueva actuación';
    ui.id.value = action?.id || '';
    ui.name.value = action?.nombre || '';
    ui.owner.value = action?.responsable || '';
    ui.budget.value = action?.presupuesto || '';

    ['proyecto', 'licitacion', 'obra'].forEach(key => {
      ui[`${key}Start`].value = action?.[key]?.[0] || '';
      ui[`${key}End`].value = action?.[key]?.[1] || '';
    });

    ui.deleteButton.hidden = !action;
    ui.modal.classList.add('open');
    ui.name.focus();
  }

  function closeModal() {
    ui.modal.classList.remove('open');
  }

  function save(event) {
    event.preventDefault();
    const id = Number(ui.id.value) || Date.now();
    const action = {
      id,
      nombre: ui.name.value.trim(),
      responsable: ui.owner.value.trim(),
      presupuesto: Number(ui.budget.value) || 0
    };

    ['proyecto', 'licitacion', 'obra'].forEach(key => {
      action[key] = [ui[`${key}Start`].value, ui[`${key}End`].value];
    });

    const index = DATA.actuaciones.findIndex(item => item.id === id);
    if (index >= 0) DATA.actuaciones.splice(index, 1, action);
    else DATA.actuaciones.push(action);

    closeModal();
    renderGantt();
  }

  function remove() {
    const id = Number(ui.id.value);
    if (!id || !confirm('¿Eliminar esta actuación?')) return;
    DATA.actuaciones = DATA.actuaciones.filter(item => item.id !== id);
    closeModal();
    renderGantt();
  }

  function shift(amount) {
    monthShift += amount;
    ui.shiftValue.textContent = `${monthShift > 0 ? '+' : ''}${monthShift} meses`;
    renderGantt();
  }

  document.addEventListener('DOMContentLoaded', () => {
    ui = {
      gantt: document.getElementById('gantt'),
      modal: document.getElementById('act-modal'),
      modalTitle: document.getElementById('modal-title'),
      id: document.getElementById('act-id'),
      name: document.getElementById('act-name'),
      owner: document.getElementById('act-owner'),
      budget: document.getElementById('act-budget'),
      proyectoStart: document.getElementById('proyecto-start'),
      proyectoEnd: document.getElementById('proyecto-end'),
      licitacionStart: document.getElementById('licitacion-start'),
      licitacionEnd: document.getElementById('licitacion-end'),
      obraStart: document.getElementById('obra-start'),
      obraEnd: document.getElementById('obra-end'),
      deleteButton: document.getElementById('deleteBtn'),
      shiftValue: document.getElementById('shiftValue')
    };

    document.documentElement.style.setProperty('--act-row-count', Math.max(DATA.actuaciones.length, 1));
    renderGantt();

    ui.gantt.addEventListener('click', event => {
      const button = event.target.closest('.act-link');
      if (button) openModal(Number(button.dataset.id));
    });
    document.getElementById('newActBtn').addEventListener('click', () => openModal());
    document.getElementById('prevMonth').addEventListener('click', () => shift(-1));
    document.getElementById('nextMonth').addEventListener('click', () => shift(1));
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeModal);
    ui.deleteButton.addEventListener('click', remove);
    document.getElementById('act-form').addEventListener('submit', save);
    ui.modal.addEventListener('click', event => {
      if (event.target === ui.modal) closeModal();
    });
  });
})();

(() => {
  'use strict';

  const DATA = window.ACTUACIONES_DATA;
  const MAX = 4;
  const $ = selector => document.querySelector(selector);
  const esc = (value = '') => String(value).replace(/[&<>'"]/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[character]);
  const list = type => type === 'finalizadas' ? DATA.finalizadas : DATA.proyectosFinalizados;
  const label = type => type === 'finalizadas' ? 'actuación finalizada' : 'proyecto finalizado';
  const toISO = value => {
    const match = String(value || '').match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    return match ? `${match[3]}-${match[2]}-${match[1]}` : '';
  };
  const toES = value => value ? value.split('-').reverse().join('/') : '';

  function ensureModal() {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="modal-backdrop" id="finished-modal" role="dialog" aria-modal="true">
        <section class="act-modal finished-modal-box">
          <header class="modal-head"><h2 id="finished-modal-title"></h2><button class="icon-btn" id="closeFinishedModal" type="button">×</button></header>
          <form class="act-form" id="finished-form">
            <input id="finished-type" type="hidden"><input id="finished-index" type="hidden">
            <div class="finished-form-grid">
              <label class="field finished-name-field">Denominación<input id="finished-name" required></label>
              <label class="field">Fecha inicial<input id="finished-start" type="date" required></label>
              <label class="field">Fecha final<input id="finished-end" type="date" required></label>
              <label class="field">Responsable<input id="finished-owner" required></label>
              <label class="field">Presupuesto<input id="finished-budget" placeholder="Ej. 2,7M" required></label>
            </div>
            <div class="modal-actions"><button class="danger-btn" id="deleteFinishedBtn" type="button">Eliminar registro</button><div class="actions-right"><button class="secondary-btn" id="cancelFinishedBtn" type="button">Cancelar</button><button class="primary-btn" type="submit">Guardar</button></div></div>
          </form>
        </section>
      </div>`);
  }

  function prepareTitles() {
    [
      ['.finalizadas', 'finalizadas', 'Actuaciones Finalizadas'],
      ['.proyectos', 'proyectosFinalizados', 'Proyectos Finalizados']
    ].forEach(([card, type, text]) => {
      const heading = $(`${card} h2`);
      if (!heading) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'finished-title';
      button.textContent = text;
      button.onclick = () => add(type);
      heading.replaceWith(button);
    });
  }

  function render() {
    renderOne('#finalizadas-list', 'finalizadas');
    renderOne('#proyectos-list', 'proyectosFinalizados');
  }

  function renderOne(selector, type) {
    const root = $(selector);
    if (!root) return;
    root.innerHTML = list(type).slice(0, MAX).map((item, index) => `<button class="finished-row" type="button" data-type="${type}" data-index="${index}"><img class="finished-icon icon-calendar" src="../ICONOS/Calendario_Actuaciones.svg" alt=""><span class="finished-content"><span class="finished-main"><span class="finished-date">${esc(item.fecha)}</span><strong>${esc(item.nombre)}</strong></span><span class="finished-person"><img class="finished-icon icon-person" src="../ICONOS/Responsable_Actuaciones.svg" alt=""><span>${esc(item.responsable)}</span></span><span class="finished-money"><img class="finished-icon icon-money" src="../ICONOS/Dinero_Actuaciones.svg" alt=""><span>${esc(item.presupuesto)}</span></span></span></button>`).join('');
  }

  function add(type) {
    if (list(type).length >= MAX) {
      alert(`No se pueden añadir más registros. Hay ${MAX}; elimina previamente alguno.`);
      return;
    }
    open(type, -1);
  }

  function open(type, index) {
    const item = index >= 0 ? list(type)[index] : null;
    const dates = String(item?.fecha || '').split(' - ');
    $('#finished-type').value = type;
    $('#finished-index').value = index;
    $('#finished-modal-title').textContent = index >= 0 ? `Editar ${label(type)}` : `Nueva ${label(type)}`;
    $('#finished-name').value = item?.nombre || '';
    $('#finished-start').value = toISO(dates[0]);
    $('#finished-end').value = toISO(dates[1]);
    $('#finished-owner').value = item?.responsable || '';
    $('#finished-budget').value = item?.presupuesto || '';
    $('#deleteFinishedBtn').hidden = index < 0;
    $('#finished-modal').classList.add('open');
  }

  function close() {
    $('#finished-modal').classList.remove('open');
  }

  function save(event) {
    event.preventDefault();
    const type = $('#finished-type').value;
    const index = Number($('#finished-index').value);
    const items = list(type);
    const item = {
      fecha: `${toES($('#finished-start').value)} - ${toES($('#finished-end').value)}`,
      nombre: $('#finished-name').value.trim(),
      responsable: $('#finished-owner').value.trim(),
      presupuesto: $('#finished-budget').value.trim()
    };
    if (index >= 0) items.splice(index, 1, item);
    else items.push(item);
    close();
    render();
  }

  function remove() {
    const type = $('#finished-type').value;
    const index = Number($('#finished-index').value);
    if (index < 0 || !confirm(`¿Eliminar este ${label(type)}?`)) return;
    list(type).splice(index, 1);
    close();
    render();
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.empty-slot').forEach(element => element.remove());
    ensureModal();
    prepareTitles();
    render();

    $('#finalizadas-list').addEventListener('click', event => {
      const row = event.target.closest('.finished-row');
      if (row) open(row.dataset.type, Number(row.dataset.index));
    });
    $('#proyectos-list').addEventListener('click', event => {
      const row = event.target.closest('.finished-row');
      if (row) open(row.dataset.type, Number(row.dataset.index));
    });
    $('#closeFinishedModal').onclick = close;
    $('#cancelFinishedBtn').onclick = close;
    $('#deleteFinishedBtn').onclick = remove;
    $('#finished-form').onsubmit = save;
    $('#finished-modal').onclick = event => {
      if (event.target.id === 'finished-modal') close();
    };
  });
})();

/* Impresion: una imagen, una pagina A4 horizontal */
(() => {
 'use strict';
 function copyStyles(source,target){const c=getComputedStyle(source);let t='';for(const p of c){if(/(^|-)(inline|block)(-|$)/.test(p))continue;t+=`${p}:${c.getPropertyValue(p)};`;}target.setAttribute('style',t);for(let i=0;i<source.children.length;i++)copyStyles(source.children[i],target.children[i]);}
 async function asDataUrl(image){const src=image.currentSrc||image.src;if(!src||src.startsWith('data:'))return src;try{const b=await(await fetch(src)).blob();return await new Promise((ok,fail)=>{const r=new FileReader();r.onload=()=>ok(r.result);r.onerror=fail;r.readAsDataURL(b);});}catch{return src;}}
 async function createPrintImage(){
  const dashboard=document.querySelector('.actuaciones-dashboard');
  const table=dashboard?.querySelector('.act-table');
  if(!dashboard||!table)throw new Error('No se encontro el cronograma');

  /* Ancho determinista: 3 columnas fijas + todos los meses visibles.
     No depende del viewport ni del scroll horizontal de la pantalla. */
  const monthCount=table.querySelectorAll('thead tr:nth-child(2) .month-head').length;
  const nameWidth=330;
  const ownerWidth=115;
  const budgetWidth=145;
  const monthWidth=55;
  const tableWidth=nameWidth+ownerWidth+budgetWidth+(monthCount*monthWidth);
  /* La tabla ya tiene las 18 columnas fijadas mediante colgroup.
     El ancho total debe ser el mismo para la tabla y las tarjetas inferiores. */
  const dashboardPadding=24;
  const captureWidth=tableWidth+dashboardPadding;

  const clone=dashboard.cloneNode(true);
  copyStyles(dashboard,clone);
  Object.assign(clone.style,{
   boxSizing:'border-box',width:`${captureWidth}px`,minWidth:`${captureWidth}px`,maxWidth:`${captureWidth}px`,
   height:'auto',minHeight:'0',margin:'0',padding:'8px 12px 10px',gridTemplateRows:'auto 214px',overflow:'visible'
  });

  const viewport=clone.querySelector('.gantt-scroll');
  const clonedTable=clone.querySelector('.act-table');
  if(viewport)Object.assign(viewport.style,{
   boxSizing:'border-box',width:`${tableWidth}px`,minWidth:`${tableWidth}px`,maxWidth:`${tableWidth}px`,
   height:'auto',overflow:'visible'
  });
  if(clonedTable){
   const oldColgroup=clonedTable.querySelector('colgroup');
   if(oldColgroup)oldColgroup.remove();
   const colgroup=document.createElement('colgroup');
   [nameWidth,ownerWidth,budgetWidth,...Array(monthCount).fill(monthWidth)].forEach(columnWidth=>{
    const col=document.createElement('col');
    col.style.width=`${columnWidth}px`;
    col.style.minWidth=`${columnWidth}px`;
    col.style.maxWidth=`${columnWidth}px`;
    colgroup.appendChild(col);
   });
   clonedTable.insertBefore(colgroup,clonedTable.firstChild);
   Object.assign(clonedTable.style,{
    boxSizing:'border-box',width:`${tableWidth}px`,minWidth:`${tableWidth}px`,maxWidth:`${tableWidth}px`,
    tableLayout:'fixed',height:'auto'
   });
  }

  const bottom=clone.querySelector('.act-bottom');
  if(bottom)Object.assign(bottom.style,{
   boxSizing:'border-box',width:`${tableWidth}px`,minWidth:`${tableWidth}px`,maxWidth:`${tableWidth}px`,
   gridTemplateColumns:'375px repeat(2,minmax(0,1fr))'
  });

  /* Tarjetas inferiores: copyStyles fija en px el ancho de pantalla de cada tarjeta y de sus
     rejillas internas. Se devuelven a reglas flexibles para que ocupen el ancho de la imagen. */
  clone.querySelectorAll('.bottom-card').forEach(card=>{
   Object.assign(card.style,{width:'auto',minWidth:'0',maxWidth:'none'});
  });
  clone.querySelectorAll('.finalizadas *,.proyectos *').forEach(el=>{
   if(el.tagName==='IMG')return;
   el.style.width=el.matches('.finished-row,.finished-title')?'100%':'auto';
   el.style.minWidth='0';
   el.style.maxWidth='none';
  });
  const tracks={
   '.finished-row':'26px minmax(0,1fr)',
   '.finished-content':'minmax(0,1fr) 82px 64px',
   '.finished-person':'15px minmax(0,1fr)',
   '.finished-money':'24px minmax(0,1fr)'
  };
  Object.entries(tracks).forEach(([selector,columns])=>clone.querySelectorAll(selector).forEach(el=>el.style.gridTemplateColumns=columns));

  clone.querySelectorAll('.empty-slot').forEach(e=>e.remove());
  const originalImages=[...dashboard.querySelectorAll('img')];
  const clonedImages=[...clone.querySelectorAll('img')];
  await Promise.all(clonedImages.map(async(image,index)=>image.src=await asDataUrl(originalImages[index])));

  const measure=document.createElement('div');
  measure.style.cssText=`position:absolute;left:-30000px;top:0;width:${captureWidth}px;background:#fff;overflow:visible;`;
  measure.appendChild(clone);
  document.body.appendChild(measure);
  await new Promise(ok=>requestAnimationFrame(()=>requestAnimationFrame(ok)));

  const titleHeight=46;
  const captureHeight=Math.ceil(clone.scrollHeight)+4+titleHeight;
  const wrap=document.createElement('div');
  wrap.setAttribute('xmlns','http://www.w3.org/1999/xhtml');
  wrap.style.cssText=`box-sizing:border-box;width:${captureWidth}px;height:${captureHeight}px;padding:2px;background:#fff;overflow:hidden;`;
  const pageTitle=document.getElementById('pageTitle');
  if(pageTitle){
   const titleClone=pageTitle.cloneNode(true);
   copyStyles(pageTitle,titleClone);
   Object.assign(titleClone.style,{display:'flex',alignItems:'center',boxSizing:'border-box',width:'100%',minWidth:'0',maxWidth:'none',flex:'none',height:`${titleHeight}px`,margin:'0',padding:'0 22px',background:'#fff',borderBottom:'1px solid #dbe1e5'});
   wrap.appendChild(titleClone);
  }
  wrap.appendChild(clone);
  measure.remove();

  const xml=new XMLSerializer().serializeToString(wrap);
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${captureWidth}" height="${captureHeight}" viewBox="0 0 ${captureWidth} ${captureHeight}"><foreignObject x="0" y="0" width="${captureWidth}" height="${captureHeight}">${xml}</foreignObject></svg>`;
  const image=new Image();
  await new Promise((ok,fail)=>{image.onload=ok;image.onerror=fail;image.src=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;});

  /* Lienzo final con la misma superficie y proporción de Embalses:
     área útil A4 horizontal de 287 x 199 mm a 6 px/mm. La captura completa
     de Actuaciones se ajusta a este lienzo para evitar la franja inferior. */
  const outputWidth=1722;
  const outputHeight=1194;
  const canvas=document.createElement('canvas');
  canvas.width=outputWidth;
  canvas.height=outputHeight;
  const ctx=canvas.getContext('2d');
  ctx.fillStyle='#fff';
  ctx.fillRect(0,0,outputWidth,outputHeight);
  ctx.drawImage(image,0,0,captureWidth,captureHeight,0,0,outputWidth,outputHeight);
  return canvas.toDataURL('image/png');
 }

 let printCache={sig:'',src:''};
 async function printView(event){event?.preventDefault();try{const sig=JSON.stringify(window.ACTUACIONES_DATA)+(document.getElementById('shiftValue')?.textContent||'');const src=(printCache.sig===sig&&printCache.src)?printCache.src:await createPrintImage();printCache={sig,src};let img=document.getElementById('printActuacionesImg');if(!img){img=document.createElement('img');img.id='printActuacionesImg';img.alt='Cronograma de actuaciones';document.body.appendChild(img);}img.src=src;if(img.decode)await img.decode();document.body.classList.add('print-actuaciones-image');await new Promise(ok=>requestAnimationFrame(()=>requestAnimationFrame(ok)));window.print();}catch(error){console.warn(error);window.print();}}
 window.addEventListener('afterprint',()=>document.body.classList.remove('print-actuaciones-image'));
 document.addEventListener('DOMContentLoaded',()=>{const b=document.getElementById('printBtn')||document.querySelector('.print-btn');if(b)b.onclick=printView;});
 window.__capturePrintPage = createPrintImage;
 window.__nativePrintPage = printView;
})();
