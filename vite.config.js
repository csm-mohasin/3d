import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Using base: './' keeps asset paths correct for GitHub Pages
// whether you deploy to a root domain or /<repo>/ subpath.
export default defineConfig({
  plugins: [react()],
  base: './'
});
