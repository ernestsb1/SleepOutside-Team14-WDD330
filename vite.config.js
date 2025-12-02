import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),         // home page
        book: resolve(__dirname, "src/pages/book.html"),    // book details
        lists: resolve(__dirname, "src/pages/lists.html"),  // reading list selection
        list: resolve(__dirname, "src/pages/list.html"),    // individual reading list
      },
    },
  },
});
