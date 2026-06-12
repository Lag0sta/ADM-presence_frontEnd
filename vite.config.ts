import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
      registerType: 'autoUpdate',

      manifest: {
        name: 'ADM Presence',
        short_name: 'ADMp',
        description: 'Gestion des présences',
        theme_color: '#ffffff',
        icons: [
          {
            src: './public/BanderoleFuzue.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './public/BanderoleFuzue.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    })],
})
