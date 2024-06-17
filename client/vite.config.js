import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// // https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     proxy: {
//       "/api": {
//         target: "https://realestate-89q9.onrender.com",
//         changeOrigin: true, // Ensures the host header is changed to the target URL
//         secure: true, // Typically, keep secure true unless you are using self-signed certificates
//       },
//     },
//   },
//   plugins: [react()],
// });
