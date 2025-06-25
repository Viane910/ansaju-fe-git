import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import Login from '../data/login/login';
import Register from '../data/register/register';
import QuestionOne from '../pages/question/question-one';
import ProfilePage from '../pages/dashboard/profile-page';
import RiwayatPage from '../pages/riwayat/riwayat-page';
import RecommendationPage from '../pages/rekomendasi/recommendation-page';
import ArtikelDetailPage from '../pages/artikel/artikel-detail-page';
import ArtikelPage from '../pages/artikel/artikel-page';

const id = window.location.pathname.split('/').pop();

const routes = {
  '/': new HomePage(),
  '/about': new AboutPage(),
  '/login': new Login(),
  '/register': new Register(),
  '/quiz': new QuestionOne(),
  '/dashboard': new ProfilePage(),
  '/riwayat': new RiwayatPage(),
  '/rekomendasi': new RecommendationPage(),
  '/artikel': new ArtikelPage(),
  '/artikel/:id': new ArtikelDetailPage(id),
};

export default routes;
