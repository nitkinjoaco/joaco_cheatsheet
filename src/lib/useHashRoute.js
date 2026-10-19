import { useEffect, useState } from 'react';

// Rutas con hash, sin librerías:
//   #/                    bienvenida
//   #/carpetas            bienvenida, con scroll hasta las tres carpetas
//   #/guia                guía
//   #/backend             primer cheatsheet de la carpeta
//   #/backend/git         un cheatsheet

function parse() {
  const [first, second] = window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (!first) return { page: 'welcome' };
  if (first === 'carpetas') return { page: 'welcome', section: 'carpetas' };
  if (first === 'guia') return { page: 'guide' };
  return { page: 'reader', folder: first, slug: second };
}

export function useHashRoute() {
  const [route, setRoute] = useState(parse);

  useEffect(() => {
    const onChange = () => {
      const next = parse();
      setRoute(next);
      // Con sección, la bienvenida hace el scroll sola; en el resto vuelve arriba.
      if (!next.section) window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
