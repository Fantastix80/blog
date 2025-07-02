import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const url = context.url;

  // Si on est sur la racine
  if (url.pathname === '/') {
    return Response.redirect(`${url.origin}/fr`, 302);
  }

  // Continue normalement sinon
  return next();
};
