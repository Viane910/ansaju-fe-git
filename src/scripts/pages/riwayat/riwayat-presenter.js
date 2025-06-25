import * as DataAPI from '../../data/api';
import { getAccessToken } from '../../utils/auth.js';

export default class RiwayatPresenter {
  #view;
  #model;
  #presenter;

  constructor({ view, presenter, model }) {
    this.#view = view;
    this.#model = model;
    this.#presenter = presenter;
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
}
