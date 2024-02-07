import { mergeConfig } from "vite";
import baseConfig from "./vite.config.base";

export default mergeConfig(
  {
    mode: "development",
    server: {
      open: false,
      fs: {
        strict: true,
      },
      proxy: {
        "/api": {
          target: "http://192.168.0.77:8081",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    plugins: [],
  },
  baseConfig
);
