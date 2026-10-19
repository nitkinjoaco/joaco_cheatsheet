import { Kbd, MeshBackground, NavBar, Prompt } from '../components/index.js';
import { navLinks } from '../lib/nav.js';
import { Footer } from './Footer.jsx';

/** Guía rápida de cómo se usa NoteFast. */
export function GuidePage({ openSearch }) {
  return (
    <MeshBackground variant="soft" className="page">
      <NavBar links={navLinks('guide')} onSearch={openSearch} />
      <main className="g-main">
        <Prompt command="man notefast" />
        <h1 className="display-title g-title">Guía.</h1>
        <ul className="g-list">
          <li>
            <h2>Elegí una carpeta</h2>
            <p>Backend, frontend o hardware: cada una tiene su color y sus cheatsheets.</p>
          </li>
          <li>
            <h2>
              Buscá con <Kbd>⌘K</Kbd>
            </h2>
            <p>Escribí el nombre de un cheatsheet y apretá Enter.</p>
          </li>
          <li>
            <h2>Copiá con un click</h2>
            <p>Cada bloque de código tiene su botón Copiar.</p>
          </li>
          <li>
            <h2>Seguí el índice</h2>
            <p>La barra de la derecha marca en qué sección estás mientras leés.</p>
          </li>
        </ul>
      </main>
      <Footer />
    </MeshBackground>
  );
}
