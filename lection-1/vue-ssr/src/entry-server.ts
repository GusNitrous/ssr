import { createSSRApp, h } from "vue";
import { renderToString } from "vue/server-renderer";

import App from "./App.vue";

export async function render({ url }: { url: URL }) {
  const res = await fetch("https://fakestoreapi.com/products?limit=6");
  const products = await res.json();

  const app = createSSRApp({
    render: () => h(App),
  });

  app.provide("products", products);
  app.provide("location", url);

  const appHtml = await renderToString(app);

  return {
    appHtml,
    data: { products },
  };
}
