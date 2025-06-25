export default class HomePage {
  async render() {
    return `
      <header-page></header-page>
      <!-- Middle Section -->
<section class="w-full flex items-center justify-center h-auto min-h-[24rem] overflow-hidden bg-gradient-to-b from-[#ffff] to-[#00bfff] py-10 sm:h-96">
  <div class="relative z-10 container mx-auto px-4 text-center text-[#1D5D9B] flex flex-col items-center justify-center h-full">
    <span class="mb-5 sm:mb-40 text-[40px] font-bold tracking-tight">
      Data Statistik Perkuliahan
    </span>
    <div class="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-center mb-6 sm:mt-10 sm:mb-10 w-full text-gray-600">
      <div class="flex flex-col items-center">
        <p class="text-2xl sm:text-4xl font-bold">4.437</p>
        <span class="text-xl font-semibold sm:text-2xl !mt-2">Universitas</span>
      </div>
      <div class="flex flex-col items-center">
        <p class="text-2xl sm:text-4xl font-bold">33.213</p>
        <span class="text-xl font-semibold sm:text-2xl !mt-2">Jurusan</span>
      </div>
      <div class="flex flex-col items-center">
        <p class="text-2xl sm:text-4xl font-bold">9.878.119</p>
        <span class="text-xl font-semibold sm:text-2xl !mt-2">Mahasiswa</span>
      </div>
    </div>
    <span class="text-lg font-semibold sm:text-xl text-center sm:mt-32 text-gray-600">
      2022 (April 2023) Kemendikbudristek Indonesia
    </span>
  </div>
</section>
<carousel-page></carousel-page>
      <footer-page></footer-page>
      `;
  }

  async afterRender() {
    const header = document.querySelector('header-page')?.shadowRoot;
    if (header) {
      const logoutBtn = header.getElementById('logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          localStorage.removeItem('accessToken');
          window.location.pathname = '/login';
        });
      }
    }
  }
}
