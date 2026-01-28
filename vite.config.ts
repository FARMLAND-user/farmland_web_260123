import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 호스팅케이알 등 루트 도메인(www.farmland.co.kr)에 배포할 때는 절대 경로 '/'를 사용하는 것이 가장 안정적입니다.
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});