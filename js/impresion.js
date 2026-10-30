/* ==========================================================================
   IMPRESIÓN COMPARTIDA (Embalses, Explotación, Actuaciones y Demanda)
   Único punto de código para el selector «Ventana actual / Todas las ventanas».
   Cada ventana solo expone window.__capturePrintPage().
   ========================================================================== */
(() => {
  'use strict';
  if (window.__PRINT_SELECTOR_UNICO__) return;
  window.__PRINT_SELECTOR_UNICO__ = true;

  const nombres = ['Embalses', 'Explotación', 'Actuaciones', 'Demanda'];

  const esperar = ms => new Promise(ok => setTimeout(ok, ms));
  const frames = (win, n = 3) => new Promise(ok => {
    const paso = k => (k <= 0 ? ok() : win.requestAnimationFrame(() => paso(k - 1)));
    paso(n);
  });
  const PREPARAR = ['__prepareDemandaPrint', '__prepareEmbalsesPrint', '__prepareExplotacionPrint', '__prepareActuacionesPrint'];

  /* Espera a que la ventana esté realmente lista: fuentes, imágenes decodificadas
     y dos o tres fotogramas de pintado tras el último ajuste de tamaño. */
  async function prepararVentana(win) {
    const doc = win.document;
    if (doc.fonts?.ready) await doc.fonts.ready;
    /* Una imagen rota (complete=true, naturalWidth=0) no volverá a lanzar load/error:
       no se espera por ella. Las que siguen cargando tienen un tope de 5 s. */
    await Promise.all([...doc.images].map(im => {
      if (im.complete) return (im.naturalWidth && im.decode) ? im.decode().catch(() => {}) : Promise.resolve();
      return new Promise(ok => {
        const fin = () => ok();
        im.addEventListener('load', fin, { once: true });
        im.addEventListener('error', fin, { once: true });
        setTimeout(fin, 5000);
      });
    }));
    for (const nombre of PREPARAR) if (typeof win[nombre] === 'function') await win[nombre]();
    win.dispatchEvent(new Event('resize'));
    await frames(win, 3);
    await esperar(120);
  }

  /* Captura verificada: se rasteriza una y otra vez hasta que dos capturas
     consecutivas son idénticas (la imagen ya no cambia = todo cargado y pintado).
     Si una captura falla se reintenta; solo se rinde tras varios intentos. */
  async function capturaEstable(win, estado) {
    await prepararVentana(win);
    let previa = null, ultimoError = null;
    for (let intento = 0; intento < 8; intento++) {
      try {
        const actual = await win.__capturePrintPage();
        if (previa !== null && actual === previa) return actual;
        previa = actual;
      } catch (error) {
        ultimoError = error;
        previa = null;
      }
      await esperar(150 + intento * 100);
      await frames(win, 2);
    }
    if (previa) { console.warn('[Impresión] la captura no llegó a estabilizarse; se usa la última'); return previa; }
    throw ultimoError || new Error('No se pudo generar la captura');
  }

  function raizProyecto() {
    const url = new URL(location.href);
    const partes = url.pathname.split('/').filter(Boolean);
    const ultimo = (partes.at(-1) || '').toLowerCase();
    const anterior = (partes.at(-2) || '').toLowerCase();
    if (['explotacion','actuaciones','demanda'].includes(ultimo)) return new URL('../', url);
    if (['index.html','index.htm'].includes(ultimo) && ['explotacion','actuaciones','demanda'].includes(anterior)) return new URL('../../', url);
    return new URL('./', url);
  }

  function urlsVentanas() {
    const raiz = raizProyecto();
    return ['./','explotacion/','actuaciones/','demanda/'].map(ruta => new URL(ruta, raiz).href);
  }

  function crearDialogo() {
    if (document.getElementById('globalPrintDialog')) return;
    document.body.insertAdjacentHTML('beforeend', `<dialog id="globalPrintDialog" class="global-print-dialog"><div class="global-print-box"><header><span class="global-print-symbol">⎙</span><div><h2>Imprimir informe</h2><p>Seleccione el contenido que desea enviar a PDF.</p></div><button id="globalPrintClose" class="global-print-close" type="button">×</button></header><div class="global-print-options"><button id="printCurrentOption" class="global-print-option" type="button"><b>Ventana actual</b><span>Usa la impresión individual ya ajustada.</span></button><button id="printAllOption" class="global-print-option" type="button"><b>Todas las ventanas</b><span>Cuatro páginas usando las mismas capturas individuales.</span></button></div><p id="globalPrintStatus" class="global-print-status"></p><footer><button id="globalPrintCancel" type="button">Cancelar</button></footer></div></dialog>`);
    const dialogo = document.getElementById('globalPrintDialog');
    document.getElementById('globalPrintClose').onclick = () => dialogo.close();
    document.getElementById('globalPrintCancel').onclick = () => dialogo.close();
    document.getElementById('printCurrentOption').onclick = () => imprimirActual(dialogo);
    document.getElementById('printAllOption').onclick = () => imprimirTodas(dialogo);
    dialogo.onclick = evento => { if (evento.target === dialogo) dialogo.close(); };
  }

  function ocupado(dialogo, activo, texto = '') {
    dialogo.querySelectorAll('button').forEach(boton => boton.disabled = activo);
    const estado = document.getElementById('globalPrintStatus');
    estado.textContent = texto;
    estado.classList.toggle('busy', activo);
  }

  async function imprimirActual(dialogo) {
    ocupado(dialogo, true, 'Preparando la ventana actual…');
    try {
      if (typeof window.__capturePrintPage !== 'function') throw new Error('La función de captura no está disponible');
      const imagen = await capturaEstable(window);
      dialogo.close();
      await montarEImprimir([imagen]);
    } catch (error) {
      console.error(error);
      alert(`No se pudo imprimir la ventana actual. ${error.message}`);
    } finally {
      ocupado(dialogo, false, '');
    }
  }
  function capturarVentana(url, indice, estado) {
    return new Promise((resolve, reject) => {
      const marco = document.createElement('iframe');
      marco.className = 'global-print-frame';
      /* Viewport fijo para que la primera captura no dependa del tamaño
         provisional de la ventana desde la que se inicia la impresión. */
      /* Usar el mismo viewport real que la impresión individual.
         El tamaño fijo 1600 x 1000 redistribuía Explotación al imprimir Todas. */
      const viewportWidth = Math.round(document.documentElement.clientWidth);
      const viewportHeight = Math.round(document.documentElement.clientHeight);
      marco.style.width = `${viewportWidth}px`;
      marco.style.minWidth = `${viewportWidth}px`;
      marco.style.maxWidth = `${viewportWidth}px`;
      marco.style.height = `${viewportHeight}px`;
      marco.style.minHeight = `${viewportHeight}px`;
      marco.style.maxHeight = `${viewportHeight}px`;
      marco.src = url;
      const limite = setTimeout(() => {
        marco.remove();
        reject(new Error(`${nombres[indice]} no respondió`));
      }, 60000);
      marco.onload = async () => {
        try {
          estado.textContent = `Preparando ${nombres[indice]} (${indice + 1} de 4)…`;
          for (let intento = 0; intento < 100 && typeof marco.contentWindow.__capturePrintPage !== 'function'; intento++) {
            await new Promise(ok => setTimeout(ok, 100));
          }
          if (typeof marco.contentWindow.__capturePrintPage !== 'function') throw new Error(`${nombres[indice]}: captura no disponible`);
          const win = marco.contentWindow;
          const imagen = await capturaEstable(win);

          clearTimeout(limite);
          marco.remove();
          resolve(imagen);
        } catch (error) {
          clearTimeout(limite);
          marco.remove();
          reject(error);
        }
      };
      marco.onerror = () => {
        clearTimeout(limite);
        marco.remove();
        reject(new Error(`${nombres[indice]}: ruta no accesible`));
      };
      document.body.appendChild(marco);
    });
  }

  async function montarEImprimir(imagenes) {
    /* Documento aislado dentro de un iframe oculto. No abre pestañas nuevas y
       mantiene las mismas reglas A4 para una página o para las cuatro. */
    document.getElementById('globalPrintIframe')?.remove();
    const marco = document.createElement('iframe');
    marco.id = 'globalPrintIframe';
    marco.setAttribute('aria-hidden', 'true');
    marco.style.cssText = 'position:fixed;left:-20000px;top:0;width:297mm;height:210mm;border:0;opacity:0;pointer-events:none;';
    document.body.appendChild(marco);

    const paginas = imagenes.map((imagen, indice) => `<section class="pagina"><img src="${imagen}" alt="${nombres[indice] || 'Informe'}"></section>`).join('');
    const documento = marco.contentDocument;
    documento.open();
    documento.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Informe</title><style>
      @page { size: A4 landscape; margin: 5mm; }
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; background: #fff; }
      /* Centrado vertical real: el panel queda a la misma distancia del borde
         superior e inferior del área útil de 199 mm. */
      .pagina { display: flex; align-items: center; justify-content: center; width: 100%; height: 199mm; margin: 0; padding: 0; overflow: hidden; break-after: page; page-break-after: always; break-inside: avoid-page; page-break-inside: avoid; }
      .pagina:last-child { break-after: auto; page-break-after: auto; }
      .pagina img { display: block; width: 100%; height: 191mm; margin: 0; padding: 0; border: 0; object-fit: contain; object-position: center center; }
    </style></head><body>${paginas}</body></html>`);
    documento.close();

    /* La imagen debe estar CARGADA Y DECODIFICADA antes de llamar a print();
       si no, el navegador congela la vista previa con la imagen a medio pintar. */
    await Promise.all([...documento.images].map(async imagen => {
      if (!(imagen.complete && imagen.naturalWidth)) {
        await new Promise((resolve, reject) => {
          imagen.onload = resolve;
          imagen.onerror = () => reject(new Error('La imagen de impresión no se pudo cargar'));
        });
      }
      if (imagen.decode) await imagen.decode();
    }));
    if (documento.fonts?.ready) await documento.fonts.ready;
    await frames(marco.contentWindow, 3);
    await esperar(250);

    const limpiar = () => marco.remove();
    marco.contentWindow.addEventListener('afterprint', limpiar, { once: true });
    setTimeout(limpiar, 180000);
    marco.contentWindow.focus();
    marco.contentWindow.print();
  }
  async function imprimirTodas(dialogo) {
    const estado = document.getElementById('globalPrintStatus');
    ocupado(dialogo, true, 'Preparando Embalses (1 de 4)…');
    try {
      const imagenes = [];
      const urls = urlsVentanas();
      for (let indice = 0; indice < urls.length; indice++) {
        imagenes.push(await capturarVentana(urls[indice], indice, estado));
      }
      dialogo.close();
      await montarEImprimir(imagenes);
    } catch (error) {
      console.error(error);
      alert(`No se pudieron preparar todas las ventanas. ${error.message}`);
    } finally {
      ocupado(dialogo, false, '');
      document.querySelectorAll('.global-print-frame').forEach(marco => marco.remove());
    }
  }
  function interceptar(evento) {
    if (!evento.target.closest('#printBtn,.print-btn')) return;
    evento.preventDefault();
    evento.stopPropagation();
    evento.stopImmediatePropagation();
    crearDialogo();
    document.getElementById('globalPrintStatus').textContent = '';
    document.getElementById('globalPrintDialog').showModal();
  }

  document.addEventListener('click', interceptar, true);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', crearDialogo);
  else crearDialogo();
})();
console.info("[Impresion] modulo compartido 2026-10-30");
