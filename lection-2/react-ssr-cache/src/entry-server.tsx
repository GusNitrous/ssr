import { renderToString } from "react-dom/server";

import { App } from "./App";
import { StoreItem } from "./types";
import { getRoute } from "./router";
import { cachedFetch } from "./utils";

export async function render({ url }: { url: URL }) {
  const products = (await cachedFetch(
    "https://fakestoreapi.com/products?limit=6"
  )) as StoreItem[];

  const context = {
    url,
    data: {
      products,
    },
  };

  const { getMeta } = getRoute(url);

  return {
    appHtml: renderToString(<App context={context} />),
    meta: getMeta?.(url, context) ?? "",
    data: { products },
  };
}
