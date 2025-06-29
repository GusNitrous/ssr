import { renderToString } from "react-dom/server";

import { App } from "./App";
import { StoreItem } from "./types";
import { getRoute } from "./router";

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export async function render({ url }: { url: URL }) {
  const products = (await fetch(
    "https://fakestoreapi.com/products?limit=20"
  ).then((res) => res.json())) as StoreItem[];

  const allProducts = Array.from(Array(10000)).map((index) => products[randomIntFromInterval(0, products.length - 1)]);

  const context = {
    url,
    data: {
      products: allProducts,
    },
  };

  const { getMeta } = getRoute(url);

  return {
    appHtml: renderToString(<App context={context} />),
    meta: getMeta?.(url, context) ?? "",
    data: { products: allProducts },
  };
}
