import { useEffect } from 'react';
import { Button, FolderCard, FolderChip, Kbd, MeshBackground, NavBar, Notebook, Prompt } from '../components/index.js';
import { FOLDERS, fileName, folderHref } from '../data/cheatsheets.js';
import { navLinks } from '../lib/nav.js';
import { Footer } from './Footer.jsx';

const scrollToFolders = () =>
  document.getElementById('carpetas')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

/**
 * Bienvenida: marca, un botón principal y, más abajo, las tres carpetas para elegir una.
 * "Ver carpetas" (ruta #/carpetas) hace scroll hasta la sección, sin cambiar de pantalla.
 */
export function WelcomePage({ section, openSearch }) {
  useEffect(() => {
    if (section === 'carpetas') scrollToFolders();
  }, [section]);

  // Si el hash ya es #/carpetas el clic no cambia la ruta: se hace el scroll a mano.
  useEffect(() => {
    function onClick(event) {
      const link = event.target.closest?.('a[href="#/carpetas"]');
      if (link && window.location.hash === '#/carpetas') {
        event.preventDefault();
        scrollToFolders();
      }
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <div className="page">
      <NavBar links={navLinks(section === 'carpetas' ? 'folders' : 'welcome')} />

      <MeshBackground variant="hero" className="w-hero">
        <main className="w-main">
          <Prompt command="start" cursor />
          <h1 className="display-hero w-title" aria-label="NoteFast">
            <span aria-hidden="true">NOTE</span>
            <span aria-hidden="true">FAST</span>
            <span className="w-bar" aria-hidden="true" />
            <Notebook size={176} />
          </h1>
          <p className="ui-lg w-tag">Cheatsheets de código, ordenados en tres carpetas.</p>
          <div className="w-cta">
            <Button prompt href="#/backend/git">
              Ir a la terminal
            </Button>
            <Button variant="ghost" href="#/carpetas">
              Ver carpetas
            </Button>
          </div>
          <div className="w-chips">
            {FOLDERS.map((folder) => (
              <FolderChip key={folder.id} folder={folder.id} count={folder.files.length} href={folderHref(folder)} />
            ))}
            <button type="button" className="w-search" onClick={openSearch}>
              <Kbd>⌘K</Kbd> buscar
            </button>
          </div>
        </main>
      </MeshBackground>

      <MeshBackground variant="soft" className="f-wrap">
        <section id="carpetas" className="f-section">
          <Prompt command="ls" />
          <h2 className="display-title f-title">Tres carpetas.</h2>
          <p className="ui-lg f-sub">Todo ordenado por tema. Abrí una y empezá a leer.</p>
          <div className="f-grid">
            {FOLDERS.map((folder) => {
              const files = folder.files.map(fileName);
              if (folder.soon) files.push({ name: 'pronto…', soon: true });
              return <FolderCard key={folder.id} folder={folder.id} files={files} href={folderHref(folder)} />;
            })}
          </div>
        </section>
      </MeshBackground>

      <Footer />
    </div>
  );
}
