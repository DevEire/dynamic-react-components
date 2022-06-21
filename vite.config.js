import { defineConfig } from 'vite'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/dynamic-react-components.js'),
			name: 'dynamic-react-components',
			fileName: (format) => `dynamic-react-components.${format}.js`,
		}
	}
})
