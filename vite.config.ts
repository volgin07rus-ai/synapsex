import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IPv4 binding is required so the Claude Code preview can reach the dev server.
export default defineConfig({
  // На GitHub Pages сайт живёт по адресу /synapsex/, локально — по /
  base: process.env.GITHUB_ACTIONS ? '/synapsex/' : '/',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
})
