import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server:{
  //   port:3000,
  //   proxy:{
  //     '/api':{
  //       target:'https://flixxit-backend-x6u9.onrender.com',
  //       changeOrigin:true,
  //     }
  //   }
  // }
})
