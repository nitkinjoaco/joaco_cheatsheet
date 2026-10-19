import { Button, MeshBackground, NavBar, Prompt } from '../components/index.js';
import { navLinks } from '../lib/nav.js';
import { Footer } from './Footer.jsx';

/** Se muestra cuando la ruta no existe. */
export function NotFoundPage({ openSearch }) {
  return (
    <MeshBackground variant="soft" className="page">
      <NavBar links={navLinks('')} onSearch={openSearch} />
      <main className="n-main">
        <Prompt command="cat ???" />
        <h1 className="display-sub n-title">No encontramos ese cheatsheet.</h1>
        <Button prompt href="#/carpetas">
          Ver carpetas
        </Button>
      </main>
      <Footer />
    </MeshBackground>
  );
}
