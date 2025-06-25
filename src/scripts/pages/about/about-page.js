export default class AboutPage {
  async render() {
    return `
      <header-page></header-page>
      <section class="flex flex-col items-center justify-center min-h-screen gap-8 p-4 sm:p-6 lg:p-8">
        <!-- About Ansaju Section -->
        <div class="w-full max-w-6xl">
            <div class="flex flex-col sm:flex-row  items-center !pt-6 justify-center gap-8 lg:gap-12">
    <!-- Blue Rectangle with Icon -->
    <div class="flex flex-col items-center justify-center order-1 lg:order-2">
        <div class="w-32 h-28 sm:w-40 sm:h-32 lg:w-48 lg:h-40 bg-[#00bfff] rounded-xl flex items-center justify-center shadow-lg mb-3 lg:mb-4">
            <img src="/logo.png" class="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain" alt="Logo" />
        </div>
        <span class="text-[#1D5D9B] font-bold !mt-2 text-base sm:text-base lg:text-lg">#AntiSalahJurusan</span>
    </div>

    <!-- Text Content -->
    <div class="flex flex-col text-center lg:text-left order-2 lg:order-1">
        <span class="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1D5D9B] mb-2">About Ansaju</span>
        <span class="text-center text-lg sm:text-xl lg:text-2xl font-semibold text-teal-700 mb-4 lg:mb-6">"Anti Salah Jurusan"</span>
        <p class="text-center text-gray-600 font-semibold text-lg sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
            Ansaju adalah platform edukasi yang bertujuan untuk membantu siswa dan mahasiswa dalam menemukan jurusan pendidikan yang sesuai dengan minat, bakat, dan potensi terbaik mereka.
Kami percaya bahwa setiap individu memiliki potensi unik yang bisa dikembangkan melalui pilihan jurusan yang tepat.
        </p>
    </div>
</div>
        </div>

        <!-- Objective Ansaju Section -->
        <div class="w-full max-w-6xl">
            <div class="flex flex-col lg:flex-row items-center !pb-6 justify-center gap-8 lg:gap-12">
                <!-- Blue Rectangle with Icon -->
                <div class="flex flex-col items-center justify-center order-1">
                    <div class="w-32 h-28 sm:w-40 sm:h-32 lg:w-48 lg:h-40 bg-[#00bfff] rounded-xl flex items-center justify-center shadow-lg mb-3 lg:mb-4">
                        <img src="/logo.png" class="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain" alt="Logo" />
                    </div>
                    <span class="text-[#1D5D9B] !mt-2 font-bold text-base sm:text-base lg:text-lg">#AntiSalahJurusan</span>
                </div>

                <!-- Text Content -->
                <div class="flex flex-col text-center lg:text-left order-2">
                    <span class="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1D5D9B] mb-2">Objective Ansaju</span>
                    <span class="text-center text-lg sm:text-xl lg:text-2xl font-semibold text-teal-700 mb-4 lg:mb-6">"Anti Salah Jurusan"</span>
                    <span class="text-center text-gray-600 text-lg font-semibold sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                        Ansaju bertujuan menciptakan generasi yang sadar akan potensi dirinya dan mampu menentukan arah pendidikan serta karier dengan lebih terarah.
Melalui pendekatan teknologi dengan sistem rekomendasi, kami hadir sebagai solusi bagi siswa dan mahasiswa agar tidak lagi salah memilih jurusan.
                    </span>
                </div>
            </div>
        </div>
    </section>
    <anggota-ansaju></anggota-ansaju>
      <footer-page></footer-page>
    `;
  }

  async afterRender() {
    // Do your job here
  }
}
