import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
// `npm run build:single` → standalone/index.html 하나로 JS·CSS를 모두 인라인 (더블클릭으로 실행 가능)
export default defineConfig(({ mode }) => ({
  plugins: [react(), mode === 'single' && viteSingleFile()],
  build: mode === 'single' ? { outDir: 'standalone', copyPublicDir: false } : undefined,
}))
