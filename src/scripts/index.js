// CSS imports
import '../styles/style.css';
//Component
import '../scripts/components/header-page';
import '../scripts/components/footer-page';
import '../scripts/components/carousel-page';
import './components/anggota-ansaju';
import './components/sidebar-dashboard';
//App
import App from './pages/app';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
  });
  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
  });
});
