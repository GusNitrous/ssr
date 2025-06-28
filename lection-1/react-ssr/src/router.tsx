import { ReactElement } from "react";

import { ProductPage } from "./pages/ProductPage";
import { ProductList } from "./pages/ProductsList";

import { RenderContext } from "./types";
import { NotFoundError } from "./utils";

interface Route {
  test: (url: URL) => boolean;
  Component: (props: any) => ReactElement;
  getPageProps: (context: RenderContext) => Record<string, any>;
  getMeta?: (context: RenderContext) => string;
}

const routes: Route[] = [
  {
    test: ({ pathname }: URL) => /\/product\/.*$\/?/.test(pathname),
    Component: ProductPage,
    getPageProps: (context: RenderContext): any => {
      const id = context.url.pathname.split("/").at(-1);
      const { products } = context.data;

      let product;

      if (id) {
        product = products.find((product) => Number(product.id) === Number(id));
      }

      if (!product) {
        throw new NotFoundError();
      }

      return {
        id,
        initialProduct: product,
      };
    },
    getMeta: (context: RenderContext) => {
      const { products } = context.data;
      const id = context.url.pathname.split("/").at(-1);

      let product;

      if (id) {
        product = products.find((product) => Number(product.id) === Number(id));
      }

      if (!product) {
        return "";
      }

      return `
        <title>${product.title}</title>
        <meta name="description" content="${product.description}">
      `;
    },
  },
  {
    test: ({ pathname }: URL) => /(\/$)|(^$)/.test(pathname),
    Component: ProductList,
    getPageProps: (context: RenderContext) => {
      return {
        initialProductsList: context.data.products,
      };
    },
  },
];

const routeNotFound: Route = {
  test: () => true,
  Component: () => <p>page not found</p>,
  getPageProps: () => ({}),
};

export function getRoute(url: URL) {
  const route = routes.find((route) => route.test(url));

  if (!route) {
    return routeNotFound;
  }

  return route;
}

export const navigate = (path: string) => {
  if (window.location.pathname !== path) {
    history.pushState({}, "", path);
    window.dispatchEvent(new Event("custom-history-change"));
  }
};
