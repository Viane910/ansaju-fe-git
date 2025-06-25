import { generateArticleDetailTemplate } from './template-article.js';
import ArtikelPresenter from './artikel-presenter.js';
import ArtikelLocal from '../../data/data-artikel/data-artikel.js'; // Fixed import name

export default class ArtikelDetailPage {
  #presenter;
  #id;

  constructor(id) {
    this.#id = id;
    console.log('Received article ID:', this.#id);
  }

  async render() {
    return `
      <header-page></header-page>
      <section id="article-detail" class="min-h-screen flex items-center justify-center">
        <div class="loading">Loading article...</div>
      </section>
      <footer-page></footer-page>
    `;
  }

  async afterRender() {
    if (!this.#id) {
      document.getElementById('article-detail').innerHTML = `
        <div class="error">
          <h2>Invalid article ID</h2>
          <p>Artikel tidak ditemukan karena ID tidak valid.</p>
          <a href="/artikel">← Kembali ke Daftar Artikel</a>
        </div>
      `;
      return;
    }

    try {
      this.#presenter = new ArtikelPresenter({
        model: ArtikelLocal,
        view: this,
        id: this.#id,
      });

      await this.#presenter.showArticleDetail();
    } catch (error) {
      console.error('Error loading article:', error);
      document.getElementById('article-detail').innerHTML = `
        <div class="error">
          <h2>Error Loading Article</h2>
          <p>Maaf, artikel tidak bisa dimuat. Silakan coba lagi nanti.</p>
          <a href="/artikel">← Kembali ke Daftar Artikel</a>
        </div>
      `;
    }
  }

  showArticle(article) {
    const html = generateArticleDetailTemplate(article);
    document.getElementById('article-detail').innerHTML = html;
  }
}
