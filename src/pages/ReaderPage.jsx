import { useEffect, useRef, useState } from 'react';
import { CodeBlock, FileTree, Kbd, MeshBackground, NavBar, Prompt, TocRail, WindowFrame } from '../components/index.js';
import { fileName, treeFolders } from '../data/cheatsheets.js';
import { getContent } from '../data/content.js';
import { navLinks } from '../lib/nav.js';
import { Footer } from './Footer.jsx';

const TOP_OFFSET = 72; // alto de la NavBar más un margen

/** Pantalla 3: ventana de lectura con el árbol de carpetas a la izquierda y el índice a la derecha. */
export function ReaderPage({ folder, file, openSearch }) {
  const { sections } = getContent(folder.id, file.slug);
  const items = sections.map((section) => ({ id: section.id, label: section.title }));
  const [activeId, setActiveId] = useState(items[0].id);
  const [progress, setProgress] = useState(0);
  const paneRef = useRef(null);

  useEffect(() => {
    document.title = `${file.title} · NoteFast`;
    function update() {
      let current = sections[0].id;
      for (const section of sections) {
        const heading = document.getElementById(section.id);
        if (heading && heading.getBoundingClientRect().top <= TOP_OFFSET + 48) current = section.id;
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
      setActiveId(fraction >= 0.98 ? sections[sections.length - 1].id : current);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [folder.id, file.slug]);

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
          right={<TocRail items={items} activeId={activeId} progress={progress} onSelect={goTo} />}
        >
          <Prompt path={`~/${folder.id}`} command={`cat ${fileName(file)}`} />
          {sections.map((section) => (
            <section key={section.id}>
              <h2 id={section.id} className="r-h2">
                <span>## </span>
                {section.title}
              </h2>
              {section.blocks.map((block, i) =>
                block.type === 'code' ? (
                  <CodeBlock key={i} className="r-code" title={block.title} code={block.code} shell={block.shell !== false} />
                ) : (
                  <p key={i} className="r-p">
                    {block.text}
                  </p>
                ),
              )}
            </section>
          ))}
          <div className="r-end" />
        </WindowFrame>
        <p className="ui-md r-hint">
          <Kbd>⌘K</Kbd> para saltar a cualquier cheatsheet
        </p>
      </main>
      <Footer />
    </MeshBackground>
  );
}
