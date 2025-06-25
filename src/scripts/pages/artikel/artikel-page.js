import ArtikelLocal from '../../data/data-artikel/data-artikel';
import { generateArticleListTemplate } from './template-article.js';
import ArtikelPresenter from './artikel-presenter.js';

export default class ArtikelPage {
  #presenter;

  async render() {
    return `
    <header-page></header-page>
     <section class="flex flex-col justify-center items-center max-h-full !m-10">
      <span class="text-4xl font-bold text-[#1D5D9B] text-center">Artikel Tips & Trick Mengenali Jurusanmu</span>
     <div id="article" class="max-w-screen-xl w-full !px-5 !py-8">
      </div>
    </section>
    <footer-page></footer-page>
    `;
  }

  async afterRender() {
    this.#presenter = new ArtikelPresenter({
      model: ArtikelLocal,
      view: this,
    });

    await this.#presenter.showArticles();
  }

  showArticles(articles) {
    const html = articles.reduce((acc, curr) => acc + generateArticleListTemplate(curr), '');
    document.getElementById('article').innerHTML = `
    <ul class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center mx-auto">
      ${html}
    </ul>
  `;
  }
}
