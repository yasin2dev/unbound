import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import path from 'path'
import react from '@vitejs/plugin-react'
import fs from 'fs'

dotenv.config({path: path.resolve(__dirname, '../.env')});


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  server: {
    https: {
      key: fs.readFileSync('../cert/key.pem'),
      cert: fs.readFileSync('../cert/cert.pem'),
    },
  }
})
