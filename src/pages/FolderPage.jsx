import { useEffect } from 'react';
import { CheatsheetCard, MeshBackground, NavBar, Prompt, WindowFrame } from '../components/index.js';
import { fileName, hrefFor } from '../data/cheatsheets.js';
import { navLinks } from '../lib/nav.js';
import { Footer } from './Footer.jsx';

/** Al elegir una carpeta: sus cheatsheets en tarjetas con el logo de cada tecnología. */
export function FolderPage({ folder, openSearch }) {
  useEffect(() => {
    document.title = `${folder.label} · NoteFast`;
  }, [folder]);

  return (
    <MeshBackground variant="soft" className="page">
      <NavBar links={navLinks('folders')} onSearch={openSearch} />
      <main className="d-main">
        <WindowFrame title={`${folder.id}/`} className="d-window">
          <div data-folder={folder.id}>
            <Prompt path={`~/${folder.id}`} command="ls -la" />
            <p className="d-topics">{folder.topics}</p>
            <h1 className="display-title d-title">{folder.label}</h1>
            <p className="ui-lg d-desc">{folder.description}</p>
            <p className="ui-sm d-total">total {folder.files.length}</p>
            <div className="d-grid">
              {folder.files.map((file) => (
                <CheatsheetCard
                  key={file.slug}
                  folder={folder.id}
                  title={file.title}
                  file={fileName(file)}
                  description={file.description}
                  tags={file.tags}
                  icon={file.icon}
                  href={hrefFor(folder.id, file.slug)}
                />
              ))}
            </div>
            <a className="d-back" href="#/carpetas">
              <Prompt path={`~/${folder.id}`} command="cd .." />
            </a>
          </div>
        </WindowFrame>
      </main>
      <Footer />
    </MeshBackground>
  );
}
