interface RedirectErrorArgs {
  redirect: string;
}

export class RedirectError extends Error {
  redirect: string;

  constructor(details: RedirectErrorArgs) {
    super("Redirect error");
    const { redirect } = details;
    this.redirect = redirect;
  }
}

export class NotFoundError extends Error {
  notFound = true;

  constructor() {
    super("Not found error");
  }
}

const cache = new Map();

export async function cachedFetch(url: string) {
  if (cache.has(url)) {
    console.log('retrieved from cache');
    return cache.get(url);
  }

  const res = await fetch(url);
  const data = await res.json();
  cache.set(url, data);

  return data;
}
