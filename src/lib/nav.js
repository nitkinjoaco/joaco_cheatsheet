/** Enlaces de la NavBar; `page` marca el que corresponde a la pantalla actual. */
export function navLinks(page) {
  return [
    { label: 'Carpetas', href: '#/carpetas', current: page === 'folders' },
    { label: 'Guía', href: '#/guia', current: page === 'guide' },
  ];
}
