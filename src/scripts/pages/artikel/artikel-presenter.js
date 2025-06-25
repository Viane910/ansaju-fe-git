export default class ArtikelPresenter {
  #id;
  #model;
  #view;

  constructor({ model, view, id }) {
    this.#id = id;
    this.#model = model;
    this.#view = view;
  }

  async showArticles() {
    const articles = await this.#model.getAllArticle();
    this.#view.showArticles(articles);
  }

  async showArticleDetail() {
    try {
      const article = await this.#model.getArticleById(this.#id);
      this.#view.showArticle(article);
    } catch (error) {
      throw error;
    }
  }
}
