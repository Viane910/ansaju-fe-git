import RiwayatPresenter from './riwayat-presenter';
import * as DataAPI from '../../data/api';

export default class RiwayatPage {
  #presenter = null;

  async render() {
    return `
      <nav class="bg-[#00bfff] flex justify-between h-16 items-center px-4 shadow-md">
        <div id="open-sidebar" class="flex items-center cursor-pointer">
          <svg class="w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M10 4H4c-1.10457 0-2 .89543-2 2v12c0 1.1046.89543 2 2 2h6V4ZM4.37868 9.29289c-.39052.39053-.39052 1.02371 0 1.41421l1.29283 1.2928-1.29283 1.2929c-.39052.3905-.39052 1.0237 0 1.4142.39052.3905 1.02369.3905 1.41421 0l1.99994-2c.39053-.3905.39053-1.0236 0-1.4142L5.79289 9.29289c-.39052-.39052-1.02369-.39052-1.41421 0Z" clip-rule="evenodd"/>
            <path d="M12 20h8c1.1046 0 2-.8954 2-2V6c0-1.10457-.8954-2-2-2h-8v16Z"/>
          </svg>
        </div>
      </nav>

      <div class="flex flex-col min-h-screen md:flex-row bg-gray-50">
  <sidebar-page></sidebar-page>

  <section class="flex-grow flex justify-center !py-12 !px-6 sm:px-10 lg:px-16">
    <div class="w-full max-w-4xl bg-white shadow-lg rounded-xl !p-6 md:p-10">
    <div class="text-center">
    <span class="text-3xl sm:text-4xl font-bold text-[#1A508B] mb-8">
        Riwayat Tes Potensial
    </span>
</div>  

      <div class="overflow-x-auto rounded-lg border border-gray-200">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-[#00bfff] text-white">
            <tr>
              <th class="!py-3 !px-4 text-center font-semibold">Jurusan</th>
              <th class="!py-3 !px-4 text-center font-semibold">Tanggal</th>
            </tr>
          </thead>
          <tbody id="recommendation-history" class="divide-y divide-gray-200">
          </tbody>
        </table>
      </div>
    </div>
  </section>
</div>

    `;
  }

  async afterRender() {
    this.#presenter = new RiwayatPresenter({
      view: this,
      model: DataAPI,
    });
    this.#presenter.init();
  }

  showRecommendationHistory(historyData) {
    const container = document.getElementById('recommendation-history');
    container.innerHTML = '';

    if (historyData.length === 0) {
      container.innerHTML = `
        <tr>
          <td colspan="2" class="!py-4 !px-4 text-center text-[#1B6530] text-lg font-semibold">
            Tidak ada riwayat rekomendasi.
          </td>
        </tr>`;
      return;
    }

    historyData.forEach((item) => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-gray-50';

      tr.innerHTML = `
        <td class="text-lg font-semibold !py-3 !px-4 text-center text-[#1A508B]">${item.jurusan}</td>
        <td class="text-lg font-semibold !py-3 !px-4 text-center text-[#1B6530]">${new Date(item.created_at).toLocaleDateString('id-ID')}</td>
      `;

      container.appendChild(tr);
    });
  }
}
