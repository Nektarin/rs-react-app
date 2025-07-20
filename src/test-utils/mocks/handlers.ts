import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://pokeapi.co/api/v2/pokemon/', ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit') || '10';

    const pokemons = [
      { name: 'Pikachu', url: 'url1' },
      { name: 'Bulbasaur', url: 'url2' },
      { name: 'Charmander', url: 'url3' },
    ];

    return HttpResponse.json({ results: pokemons.slice(0, Number(limit)) });
  }),
];
