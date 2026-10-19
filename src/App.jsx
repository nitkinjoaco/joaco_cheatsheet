import { useEffect, useState } from 'react';
import { CommandPalette } from './components/index.js';
import { PALETTE_ITEMS, findFile, findFolder } from './data/cheatsheets.js';
import { useHashRoute } from './lib/useHashRoute.js';
import { FolderPage } from './pages/FolderPage.jsx';
import { GuidePage } from './pages/GuidePage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { ReaderPage } from './pages/ReaderPage.jsx';
import { WelcomePage } from './pages/WelcomePage.jsx';

export default function App() {
  const route = useHashRoute();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const openSearch = () => setPaletteOpen(true);

  // ⌘K o Ctrl+K abren la paleta desde cualquier pantalla.
  useEffect(() => {
    function onKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen(true);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // El lector y la carpeta ponen su propio título; en el resto de las pantallas vuelve a "NoteFast".
  useEffect(() => {
    const hasOwnTitle = route.page === 'reader' && (route.slug ? findFile(route.folder, route.slug) : findFolder(route.folder));
    if (!hasOwnTitle) document.title = 'NoteFast';
  }, [route]);

  let page;
  if (route.page === 'welcome') {
    page = <WelcomePage section={route.section} openSearch={openSearch} />;
  } else if (route.page === 'guide') {
    page = <GuidePage openSearch={openSearch} />;
  } else {
    const folder = findFolder(route.folder);
    const file = folder && findFile(route.folder, route.slug);
    if (folder && !route.slug) page = <FolderPage key={folder.id} folder={folder} openSearch={openSearch} />;
    else if (folder && file) page = <ReaderPage key={`${folder.id}/${file.slug}`} folder={folder} file={file} openSearch={openSearch} />;
    else page = <NotFoundPage openSearch={openSearch} />;
  }

  return (
    <div className="nf-root">
      {page}
      {paletteOpen && (
        <CommandPalette
          open
          items={PALETTE_ITEMS}
          onClose={() => setPaletteOpen(false)}
          onSelect={(item) => {
            setPaletteOpen(false);
            window.location.hash = item.href.slice(1);
          }}
        />
      )}
    </div>
  );
}
