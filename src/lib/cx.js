/** Une clases de CSS ignorando los valores falsos. */
export function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}
