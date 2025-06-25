import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';
import { checkAuthenticatedRoute, getAccessToken } from '../utils/auth';

class App {
  #content = null;

  constructor({ content }) {
    this.#content = content;
  }

  async renderPage() {
    const url = getActiveRoute();
    let page = routes[url];

    const protectedRoutes = ['/dashboard', '/quiz'];
    console.log(url, 'token', getAccessToken());
    // 'protectedRoutes', protectedRoutes,
    if (protectedRoutes.includes(url)) {
      page = checkAuthenticatedRoute(page);
      if (!page) return;
    }

    this.#content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;
