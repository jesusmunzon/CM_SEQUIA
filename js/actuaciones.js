(() => {
  'use strict';
  const DATA = window.ACTUACIONES_DATA;
  const monthNames = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
  const phases = [
    { key: 'proyecto', color: '#61c548' },
    { key: 'licitacion', color: '#ffc107' },
    { key: 'obra', color: '#2494ee' }
  ];
  let monthShift = 0;

  const $ = (s) => document.querySelector(s);
  const esc = (v='') => String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const parseDate = (s) => s ? new Date(`${s}T00:00:00`) : null;
  const iso = (d) => d.toISOString().slice(0,10);
  const money = (n) => new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(Number(n)||0);

  function months() {
    const base = parseDate(DATA.inicioCronograma);
    return Array.from({length: DATA.mesesVisibles}, (_,i) => {
      const d = new Date(base.getFullYear(), base.getMonth()+i+monthShift, 1);
      return { year:d.getFullYear(), month:d.getMonth(), label:monthNames[d.getMonth()] };
    });
  }

  function fill(m, range) {
    const start=parseDate(range?.[0]), end=parseDate(range?.[1]);
    if(!start || !end) return null;
    const ms=new Date(m.year,m.month,1), me=new Date(m.year,m.month+1,0);
    if(end<ms || start>me) return null;
    const a=start>ms?start:ms, b=end<me?end:me, days=me.getDate();
    return { left:((a.getDate()-1)/days)*100, width:((b.getDate()-a.getDate()+1)/days)*100 };
  }

  function renderGantt() {
    const list=months();
    const groups=[];
    list.forEach(m => groups.at(-1)?.year===m.year ? groups.at(-1).count++ : groups.push({year:m.year,count:1}));
    const today=new Date();
    let html='<table class="act-table"><thead><tr><th class="sticky act-name" rowspan="2">Actuación</th><th class="sticky act-owner" rowspan="2">Responsable</th><th class="sticky act-budget" rowspan="2">Presupuesto<br>con IVA</th>';
    groups.forEach(g => html+=`<th colspan="${g.count}" class="year-head">${g.year}</th>`);
    html+='</tr><tr>';
    list.forEach(m => html+=`<th class="month-head">${m.label}</th>`);
    html+='</tr></thead><tbody>';

    DATA.actuaciones.forEach((a,row) => {
      html+=`<tr><td class="sticky act-name"><button class="act-link" data-id="${a.id}">${esc(a.nombre)}</button></td><td class="sticky act-owner">${esc(a.responsable)}</td><td class="sticky act-budget">${money(a.presupuesto)}</td>`;
      list.forEach((m,idx) => {
        const yearBreak=idx>0 && list[idx-1].year!==m.year;
        let bars='';
        phases.forEach(p => { const f=fill(m,a[p.key]); if(f) bars+=`<span class="phase-bar" style="--left:${f.left}%;--width:${f.width}%;--bar:${p.color}"></span>`; });
        let todayLine='';
        if(m.year===today.getFullYear() && m.month===today.getMonth()) todayLine=`<i class="today-line" style="left:${((today.getDate()-.5)/new Date(m.year,m.month+1,0).getDate())*100}%"></i>`;
        html+=`<td class="month-cell ${yearBreak?'year-break':''}">${bars}${todayLine}</td>`;
      });
      html+='</tr>';
    });
    html+='</tbody></table>';
    $('#gantt').innerHTML=html;
    document.querySelectorAll('.act-link').forEach(b=>b.addEventListener('click',()=>openModal(Number(b.dataset.id))));
  }

  function renderCards() {
    const render=(id,items) => {
      $(id).innerHTML=items.slice(0,4).map(x=>`
        <article class="finished-row">
          <img class="finished-icon finished-icon-calendar" src="../ICONOS/Calendario_Actuaciones.svg" alt="" aria-hidden="true">
          <div class="finished-content">
            <div class="finished-meta">
              <span class="finished-date">${esc(x.fecha)}</span>
              <span class="finished-person">
                <img class="finished-icon finished-icon-person" src="../ICONOS/Responsable_Actuaciones.svg" alt="" aria-hidden="true">
                <span>${esc(x.responsable)}</span>
              </span>
              <span class="finished-money">
                <img class="finished-icon finished-icon-money" src="../ICONOS/Dinero_Actuaciones.svg" alt="" aria-hidden="true">
                <span>${esc(x.presupuesto)}</span>
              </span>
            </div>
            <strong>${esc(x.nombre)}</strong>
          </div>
        </article>`).join('');
    };
    render('#finalizadas-list',DATA.finalizadas);
    render('#proyectos-list',DATA.proyectosFinalizados);
  }

  function openModal(id=null) {
    const a=DATA.actuaciones.find(x=>x.id===id);
    $('#modal-title').textContent=a?'Editar actuación':'Nueva actuación';
    $('#act-id').value=a?.id||'';
    $('#act-name').value=a?.nombre||'';
    $('#act-owner').value=a?.responsable||'';
    $('#act-budget').value=a?.presupuesto||'';
    ['proyecto','licitacion','obra'].forEach(k=>{ $(`#${k}-start`).value=a?.[k]?.[0]||''; $(`#${k}-end`).value=a?.[k]?.[1]||''; });
    $('#deleteBtn').hidden=!a;
    $('#act-modal').classList.add('open');
    $('#act-name').focus();
  }
  function closeModal(){ $('#act-modal').classList.remove('open'); }
  function save(e){
    e.preventDefault();
    const id=Number($('#act-id').value)||Date.now();
    const obj={ id, nombre:$('#act-name').value.trim(), responsable:$('#act-owner').value.trim(), presupuesto:Number($('#act-budget').value)||0 };
    ['proyecto','licitacion','obra'].forEach(k=>obj[k]=[$(`#${k}-start`).value,$(`#${k}-end`).value]);
    const i=DATA.actuaciones.findIndex(x=>x.id===id); i>=0?DATA.actuaciones.splice(i,1,obj):DATA.actuaciones.push(obj);
    closeModal(); renderGantt();
  }
  function remove(){
    const id=Number($('#act-id').value); if(!id) return;
    if(!confirm('¿Eliminar esta actuación?')) return;
    DATA.actuaciones=DATA.actuaciones.filter(x=>x.id!==id); closeModal(); renderGantt();
  }
  function shift(n){ monthShift+=n; $('#shiftValue').textContent=`${monthShift>0?'+':''}${monthShift} meses`; renderGantt(); }

  document.addEventListener('DOMContentLoaded',()=>{
    renderGantt(); renderCards();
    $('#newActBtn').addEventListener('click',()=>openModal());
    $('#prevMonth').addEventListener('click',()=>shift(-1));
    $('#nextMonth').addEventListener('click',()=>shift(1));
    $('#closeModal').addEventListener('click',closeModal);
    $('#cancelBtn').addEventListener('click',closeModal);
    $('#deleteBtn').addEventListener('click',remove);
    $('#act-form').addEventListener('submit',save);
    $('#act-modal').addEventListener('click',e=>{if(e.target.id==='act-modal')closeModal();});
  });
})();
(() => {
  'use strict';
  const DATA = window.ACTUACIONES_DATA;
  const MAX = 4;
  const $ = s => document.querySelector(s);
  const esc = (v='') => String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const list = type => type === 'finalizadas' ? DATA.finalizadas : DATA.proyectosFinalizados;
  const label = type => type === 'finalizadas' ? 'actuación finalizada' : 'proyecto finalizado';
  const toISO = es => { const m=String(es||'').match(/^(\d{2})\/(\d{2})\/(\d{4})$/); return m ? `${m[3]}-${m[2]}-${m[1]}` : ''; };
  const toES = iso => iso ? iso.split('-').reverse().join('/') : '';

  function ensureModal(){
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

  function prepareTitles(){
    const configs=[['.finalizadas','finalizadas','Actuaciones Finalizadas'],['.proyectos','proyectosFinalizados','Proyectos Finalizados']];
    configs.forEach(([card,type,text])=>{
      const h=$(card+' h2'); if(!h) return;
      const b=document.createElement('button'); b.type='button'; b.className='finished-title'; b.textContent=text; b.onclick=()=>add(type); h.replaceWith(b);
    });
  }

  function render(){ renderOne('#finalizadas-list','finalizadas'); renderOne('#proyectos-list','proyectosFinalizados'); }
  function renderOne(selector,type){
    const root=$(selector); if(!root) return;
    root.innerHTML=list(type).slice(0,MAX).map((x,i)=>`<button class="finished-row" type="button" data-type="${type}" data-index="${i}"><img class="finished-icon icon-calendar" src="../ICONOS/Calendario_Actuaciones.svg" alt=""><span class="finished-content"><span class="finished-main"><span class="finished-date">${esc(x.fecha)}</span><strong>${esc(x.nombre)}</strong></span><span class="finished-person"><img class="finished-icon icon-person" src="../ICONOS/Responsable_Actuaciones.svg" alt=""><span>${esc(x.responsable)}</span></span><span class="finished-money"><img class="finished-icon icon-money" src="../ICONOS/Dinero_Actuaciones.svg" alt=""><span>${esc(x.presupuesto)}</span></span></span></button>`).join('');
    root.querySelectorAll('.finished-row').forEach(b=>b.onclick=()=>open(b.dataset.type,Number(b.dataset.index)));
  }
  function add(type){ if(list(type).length>=MAX){ alert(`No se pueden añadir más registros. Hay ${MAX}; elimina previamente alguno.`); return; } open(type,-1); }
  function open(type,index){
    const x=index>=0?list(type)[index]:null, dates=String(x?.fecha||'').split(' - ');
    $('#finished-type').value=type; $('#finished-index').value=index;
    $('#finished-modal-title').textContent=index>=0?`Editar ${label(type)}`:`Nueva ${label(type)}`;
    $('#finished-name').value=x?.nombre||''; $('#finished-start').value=toISO(dates[0]); $('#finished-end').value=toISO(dates[1]); $('#finished-owner').value=x?.responsable||''; $('#finished-budget').value=x?.presupuesto||'';
    $('#deleteFinishedBtn').hidden=index<0; $('#finished-modal').classList.add('open');
  }
  function close(){ $('#finished-modal').classList.remove('open'); }
  function save(e){ e.preventDefault(); const type=$('#finished-type').value, i=Number($('#finished-index').value), arr=list(type); const x={fecha:`${toES($('#finished-start').value)} - ${toES($('#finished-end').value)}`,nombre:$('#finished-name').value.trim(),responsable:$('#finished-owner').value.trim(),presupuesto:$('#finished-budget').value.trim()}; i>=0?arr.splice(i,1,x):arr.push(x); close(); render(); }
  function remove(){ const type=$('#finished-type').value,i=Number($('#finished-index').value); if(i<0||!confirm(`¿Eliminar este ${label(type)}?`))return; list(type).splice(i,1); close(); render(); }

  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('.empty-slot').forEach(x=>x.remove()); ensureModal(); prepareTitles(); render();
    $('#closeFinishedModal').onclick=close; $('#cancelFinishedBtn').onclick=close; $('#deleteFinishedBtn').onclick=remove; $('#finished-form').onsubmit=save;
    $('#finished-modal').onclick=e=>{if(e.target.id==='finished-modal')close();};
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
