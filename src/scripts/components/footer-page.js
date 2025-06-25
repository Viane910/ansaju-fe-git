class FooterPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <footer class="bg-[#00bfff] rounded-t-3xl shadow-lg m-0 w-full pt-10 pb-4 flex flex-col items-center">
      <div class="w-full max-h-full flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-8 gap-8 md:gap-0">
  <div class="flex flex-col items-center md:items-start mb-4 md:mb-0">
    <a href="#" class="flex items-center space-x-4 mb-2 gap-2">
      <img src="/logo.png" class="h-16 w-16 p-2" alt="ansaju-logo" />
      <span class="text-3xl font-semibold text-[#f8f8f6]">Ansaju</span>
    </a>
    <span class="text-base text-[#f8f8f6] font-light text-center md:text-left">Sistem Rekomendasi Jurusan Perkuliahan</span>
  </div>
  <ul class="flex flex-row md:flex-row justify-center items-center gap-2 md:gap-8 text-lg font-semibold text-[#f8f8f6] text-center">
    <li><a href="/" class="hover:text-[#1A508B] transition">Beranda</a></li>
    <li><a href="/about" class="hover:text-[#1A508B] transition">Tentang</a></li>
    <li><a href="/quiz" class="hover:text-[#1A508B] transition">Tes Potensial</a></li>
    <li><a href="/dashboard" class="hover:text-[#1A508B] transition">Dashboard</a></li>
  </ul>
</div>
      <div class="w-full border-t border-[#f8f8f6] mt-10 pt-10 flex flex-col items-center">
        <span class="block text-sm text-[#f8f8f6]">© 2025 <span class="font-bold">Ansaju</span>. All Rights Reserved.</span>
        <span class="block text-xs text-[#f8f8f6] mt-1">Made with <span class="text-pink-300">♥</span> by Ansaju Team</span>
      </div>
    </footer>
      `;
  }
}

customElements.define('footer-page', FooterPage);
