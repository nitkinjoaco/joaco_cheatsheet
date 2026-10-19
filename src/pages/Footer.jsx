import { Prompt } from '../components/index.js';

export function Footer() {
  return (
    <footer className="app-footer">
      <Prompt command="exit" cursor />
      <span>© 2026 NoteFast</span>
    </footer>
  );
}
