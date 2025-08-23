import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from '@svgr/rollup'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      theme: {
        extend: {
          colors: {
            primary: '#F5F5DC', // beige
          },
        },
      },
    }),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
})
