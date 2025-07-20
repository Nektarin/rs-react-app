import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon/', ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit') || '10';

    const pokemons = Array.from({ length: Number(limit) }, (_, index) => ({
      name: `Pokemon-${index + 1}`,
      url: `https://pokeapi.co/api/v2/pokemon/${index + 1}/`,
    }));

    return HttpResponse.json({ results: pokemons });
  }),
];
