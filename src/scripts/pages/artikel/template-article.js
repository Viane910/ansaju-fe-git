export function generateArticleListTemplate({ id, judul, img }) {
  return `
    <li class="relative flex items-end justify-center w-full bg-center bg-cover cursor-pointer h-96 group rounded-xl overflow-hidden shadow-md" style="background-image: url('${img}');">
    <span class="z-20 !p-5 text-xl text-center lg:text-xl font-semibold text-[#1D5D9B]">
          ${judul}
        </span>
    <a href="/artikel/${id}" class="absolute inset-0 z-10">
        <div class="absolute inset-0 bg-gradient-to-b from-white/30 to-[#00bfff]"></div>
      </a>
    </li>
  `;
}

export function generateArticleDetailTemplate({ img, judul, isi, isi2 }) {
  return `
  <div class="max-w-screen-xl mx-auto !p-4 sm:p-10 md:p-16 relative">
  <!-- Gambar Header -->
  <div
    class="bg-cover bg-center min-h-[450px] text-center overflow-hidden rounded-lg shadow"
    style="background-image: url('${img}')"
    title="pict">
  </div>

  <!-- Konten Artikel -->
  <div class="max-w-3xl mx-auto">
    <div class="!mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal shadow-md relative z-10">
      <div class="bg-white !p-5 sm:p-10">
        <span class="text-[#1D5D9B] font-bold text-3xl sm:text-4xl mb-4">
          ${judul}
        </span>

        <p class="text-gray-600 text-base sm:text-sm !mb-4 !mt-4">
          Written By:
          <a href="#" class="text-indigo-600 font-medium hover:text-gray-900 transition duration-300">Ansaju Team : DOV</a>
        </p>
        
        <span class="block text-lg leading-8 !mb-4 !mx-4">
        ${isi}
        </span>
        <span class="block text-lg leading-8 !mb-4 !mx-4">
        ${isi2}
        </span>

        <a href="/artikel" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold !py-2 !px-4 rounded">
        Kembali
        </a>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 text-xs text-indigo-600 font-medium !mt-5">
          <a href="#" class="hover:text-gray-900 transition duration-300">#ansaju</a>
          <a href="#" class="hover:text-gray-900 transition duration-300">#jurusan</a>
          <a href="#" class="hover:text-gray-900 transition duration-300">#dodingCamp</a>
          <a href="#" class="hover:text-gray-900 transition duration-300">#dicoding</a>
          <a href="#" class="hover:text-gray-900 transition duration-300">#antiSalahJurusan</a>
        </div>
      </div>
    </div>
  </div>
</div>

    `;
}
