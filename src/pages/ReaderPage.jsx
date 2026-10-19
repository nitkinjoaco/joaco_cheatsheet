import { useEffect, useMemo, useRef, useState } from 'react';
import { FileTree, Kbd, Markdown, MeshBackground, NavBar, Prompt, TocRail, WindowFrame } from '../components/index.js';
import { fileName, treeFolders } from '../data/cheatsheets.js';
import { loadContent } from '../data/content.js';
import { parseMarkdown } from '../lib/markdown.js';
import { navLinks } from '../lib/nav.js';
import { Footer } from './Footer.jsx';

const TOP_OFFSET = 72; // alto de la NavBar más un margen

/** Pantalla 3: ventana de lectura con el árbol de carpetas a la izquierda y el índice a la derecha. */
export function ReaderPage({ folder, file, openSearch }) {
  const [markdown, setMarkdown] = useState(undefined); // undefined: cargando · null: sin contenido
  const [activeId, setActiveId] = useState();
  const [progress, setProgress] = useState(0);
  const paneRef = useRef(null);

  useEffect(() => {
    document.title = `${file.title} · NoteFast`;
  }, [file.title]);

  useEffect(() => {
    let alive = true;
    loadContent(folder.id, file.slug).then((text) => {
      if (alive) setMarkdown(text ?? null);
    });
    return () => {
      alive = false;
    };
  }, [folder.id, file.slug]);

  const doc = useMemo(() => (markdown ? parseMarkdown(markdown) : null), [markdown]);
  // El índice muestra los títulos ## y ###.
  const items = useMemo(
    () => (doc ? doc.headings.filter((h) => h.depth <= 3).map((h) => ({ id: h.id, label: h.text, depth: h.depth })) : []),
    [doc],
  );

  // Índice vivo: sección activa y progreso de lectura según el scroll.
  useEffect(() => {
    if (!items.length) return undefined;
    function update() {
      let current = items[0].id;
      for (const item of items) {
        const heading = document.getElementById(item.id);
        if (heading && heading.getBoundingClientRect().top <= TOP_OFFSET + 48) current = item.id;
      }

      let fraction = 0;
      const pane = paneRef.current;
      if (pane) {
        const rect = pane.getBoundingClientRect();
        const scrollable = rect.height - (window.innerHeight - TOP_OFFSET);
        fraction = scrollable > 0 ? Math.min(1, Math.max(0, (TOP_OFFSET - rect.top) / scrollable)) : 0;
      }
      setProgress(fraction);
      // Al llegar al final, la última sección queda marcada aunque su título no alcance el borde.
      setActiveId(fraction >= 0.98 ? items[items.length - 1].id : current);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [items]);

  // Si el índice es más alto que la pantalla, mantiene visible la sección activa.
  useEffect(() => {
    const box = document.querySelector('.nf-rail-right .nf-sticky');
    const link = box?.querySelector('a[aria-current="location"]');
    if (!box || !link) return;
    const boxRect = box.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    if (linkRect.top < boxRect.top + 24) box.scrollTop -= boxRect.top + 24 - linkRect.top;
    else if (linkRect.bottom > boxRect.bottom - 24) box.scrollTop += linkRect.bottom - boxRect.bottom + 24;
  }, [activeId]);

  function goTo(item, event) {
    event.preventDefault();
    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <MeshBackground variant="soft" className="page">
      <NavBar links={navLinks('folders')} onSearch={openSearch} />
      <main className="r-main">
        <a className="r-back" href={`#/${folder.id}`}>
          ← {folder.id}/
        </a>
        <h1 className="display-sub r-title">{file.title}</h1>
        <p className="ui-lg r-sub">{file.description}</p>
        <WindowFrame
          title={`${folder.id}/${fileName(file)}`}
          paneRef={paneRef}
          left={
            <FileTree folders={treeFolders()} activeFolder={folder.id} activeFile={fileName(file)} onSearch={openSearch} />
          }
          right={items.length ? <TocRail items={items} activeId={activeId} progress={progress} onSelect={goTo} /> : null}
        >
          <div data-folder={folder.id}>
            <Prompt path={`~/${folder.id}`} command={`cat ${fileName(file)}`} />
            {markdown === undefined && <p className="r-status">Cargando…</p>}
            {markdown === null && <p className="r-status">Este cheatsheet todavía no tiene contenido.</p>}
            {doc && <Markdown tokens={doc.tokens} />}
            <div className="r-end" />
          </div>
        </WindowFrame>
        <p className="ui-md r-hint">
          <Kbd>⌘K</Kbd> para saltar a cualquier cheatsheet
        </p>
      </main>
      <Footer />
    </MeshBackground>
  );
}
