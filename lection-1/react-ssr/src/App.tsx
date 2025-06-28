import { useEffect, useState } from "react";

import { RenderContext } from "./types";
import { getRoute } from "./router";

export function App({ context }: { context: RenderContext }) {
  const [url, setPath] = useState<URL>(context.url);
  const { Component, getPageProps } = getRoute(url);
  const renderContext = { ...context, url };

  useEffect(() => {
    const onLocationChange = () => {
      setPath(new URL(window.location.href));
    };

    window.addEventListener("popstate", onLocationChange);
    window.addEventListener("custom-history-change", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
      window.removeEventListener("custom-history-change", onLocationChange);
    };
  }, []);

  return <Component {...getPageProps(renderContext)} />;
}
