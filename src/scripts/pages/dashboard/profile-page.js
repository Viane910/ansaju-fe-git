import SidebarPresenter from '../../components-presenter/sidebar-presenter';
import ProfilePresenter from './profile-presenter';
import * as DataAPI from '../../data/api';

export default class ProfilePage {
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

<div class="flex flex-col min-h-screen md:flex-row bg-gray-100">
    <sidebar-page></sidebar-page>

    <section
      class="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-gray-100"
    >
      <div
        class="relative mx-auto w-full max-w-xs h-[450px] rounded-2xl bg-[#00bfff] overflow-hidden shadow-xl"
        style="box-shadow: 0 15px 30px rgba(0, 191, 255, 0.5)"
      >
        <div
          class="absolute items-center w-full h-24 bg-[#98e4ae] rounded-bl-2xl rounded-br-2xl"
        ></div>

        <div
          class="absolute top-4 flex flex-col items-center w-28 h-28 rounded-full overflow-hidden border-4 border-[#f8f8f6] bg-white shadow-lg left-[30%] transform -translate-x-1/2 -translate-y-1/2"
        >
          <img
            class="w-full h-full object-cover items-center"
            src="/images/profile.png"
            alt="Profile Avatar"
          />
        </div>

        <div
          class="absolute flex flex-col items-center text-center w-full !px-4 !py-2 top-[40%] transform -translate-x-1/2 -translate-y-1/2"
        >
          <span
            id="user-name"
            class="text-[#1A508B] font-semibold text-2xl mt-2 block truncate max-w-full"
            >Nama Pengguna</span
          >
          <span
            id="user-email"
            class="text-[#f8f8f6] font-medium text-lg mt-1 block break-all px-2 max-w-full"
            >email@example.com</span
          >
        </div>

        <div
          class="absolute bottom-3 w-full bg-white border border-blue-200 rounded-xl shadow-lg !px-4 !py-4"
        >
          <div class="flex items-center justify-center">
            <span
              class="text-center text-[#1A508B] text-xl font-bold uppercase tracking-wide !mb-3 "
            >
              Hasil Tes Jurusanmu
            </span>
          </div>
          <ul
            id="recommendation-history"
            class="space-y-3 text-base sm:text-xl max-h-40 overflow-y-auto px-2 text-center text-gray-700"
          ></ul>
        </div>
      </div>
    </section>
</div>
    `;
  }

  async afterRender() {
    this.#presenter = new ProfilePresenter({
      view: this,
      model: DataAPI,
    });

    SidebarPresenter.initPresenter();
    this.#presenter.init();
    this.#presenter.displayUserInfo();
  }

  showRecommendationHistory(historyData) {
    const container = document.getElementById('recommendation-history');
    container.innerHTML = '';

    if (historyData.length === 0) {
      container.innerHTML =
        '<li class="text-lg text-center text-[#00bfff]">Tidak ada riwayat rekomendasi.</li>';
      return;
    }

    // Batasi tampilan hanya 5 riwayat terbaru
    const limitedHistory = historyData.slice(0, 1);

    limitedHistory.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'border border-[#00bfff] rounded-md !p-3 text-teal-700 font-semibold';
      li.textContent = `${item.jurusan} - ${new Date(item.created_at).toLocaleDateString('id-ID')}`;
      container.appendChild(li);
    });
  }
}
