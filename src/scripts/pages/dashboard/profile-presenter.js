import * as DataAPI from '../../data/api';
import { getAccessToken } from '../../utils/auth.js';

export default class ProfilePresenter {
  #view;
  #presenter;
  #model;

  constructor({ view, presenter, model }) {
    this.#view = view;
    this.#presenter = presenter;
    this.#model = model;
  }

  async init() {
    try {
      const historyResponse = await this.#model.getRecommendationHistory();

      if (historyResponse.ok && !historyResponse.error) {
        const sortedData = historyResponse.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        this.#view.showRecommendationHistory(sortedData);
      } else {
        console.warn('Gagal mendapatkan data history:', historyResponse.message);
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat inisialisasi profil:', error);
    }
  }

  async displayUserInfo() {
    try {
      const userStorage = localStorage.getItem('user');
      if (!userStorage) return;

      const { name = 'Nama tidak tersedia', email = 'Email tidak tersedia' } =
        JSON.parse(userStorage);

      const nameElement = document.getElementById('user-name');
      const emailElement = document.getElementById('user-email');

      if (nameElement) nameElement.textContent = name;
      if (emailElement) emailElement.textContent = email;
    } catch (error) {
      console.error('Gagal menampilkan informasi pengguna:', error);
    }
  }
}
