// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {

  return {
    base:   '/learning-centre/', // dev 使用子路徑，prod 用根路徑（給自訂網域）
    plugins: [react()],
  };
});