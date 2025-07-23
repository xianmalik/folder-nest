import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	build: {
		outDir: 'build',
	},
	server: {
		port: 3000,
		open: true,
	},
	plugins: [react(), tsconfigPaths()],
})