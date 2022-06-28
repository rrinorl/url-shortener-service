import urlsRoutes from './urls.routes';

jest.mock('./urls.controller');

describe('urls.routes', () => {
  it('has routes', () => {
    const routes = [
      { path: '/urls', method: 'post' },
      { path: '/', method: 'get' },
    ];

    routes.forEach((route) => {
      const match = urlsRoutes.stack.find(
        (s) => s.route.path === route.path && s.route.methods[route.method],
      );
      expect(match).toBeTruthy();
    });
  });
});
