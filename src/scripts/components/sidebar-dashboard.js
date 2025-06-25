import SidebarPresenter from '../components-presenter/sidebar-presenter';

class Sidebar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.initPresenter();
  }

  render() {
    this.innerHTML = `
    <!-- Sidebar -->
    <aside id="sidebar-drawer" class="fixed top-0 left-0 z-50 flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-[#00bfff]">
        
        <!-- Header/Logo -->
        <div class="flex justify-center items-center">
            <img class="w-24 h-24" src="/logo.png" alt="">
            <span class="text-[#f8f8f6] font-semibold text-3xl p-5">Ansaju</span>
        </div>

        <!-- Navigation Content -->
        <div class="flex flex-col justify-between h-full !px-4 !py-4">
            <nav class="flex flex-col space-y-3 flex-1 text-[#f8f8f6] hover:text-[#1A508B]">

                <!-- Menu Beranda -->
                <a class="flex items-center !p-3 !m-2  transition-colors duration-300 transform rounded-lg hover:bg-gray-100 " href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span class="ml-2 text-xl font-semibold">Beranda</span>
                </a>

                <!-- Menu Profil -->
                <a class="flex items-center !p-3 !m-2  transition-colors duration-300 transform rounded-lg hover:bg-gray-100" href="/dashboard">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0018 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0016.5 7.605" />
                    </svg>
                    <span class="ml-2 text-xl font-semibold">Profil</span>
                </a>

                <!-- Menu Test Potensial -->
                <a class="flex items-center !p-3 !m-2  transition-colors duration-300 transform rounded-lg hover:bg-gray-100" href="/quiz">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                    </svg>
                    <span class="ml-2 text-xl font-semibold">Test Potensial</span>
                </a>

                <!-- Menu Hasil Sebelumnya -->
                <a class="flex items-center !p-3 !m-2  transition-colors duration-300 transform rounded-lg hover:bg-gray-100" href="/riwayat">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                    </svg>
                    <span class="ml-2 text-xl font-semibold">Hasil Sebelumnya</span>
                </a>
            </nav>
            <!-- Close Button -->
            <div class="text-gray-100 flex items-center w-full justify-center !p-20 !mt-20 ">
            <button id="closeSidebar" class="rounded-lg transition-colors duration-300">
                <svg class="w-20 h-20" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clip-rule="evenodd"/>
                </svg>
            </button>
            </div>
        </div>
    </aside>
    `;
  }

  initPresenter() {
    const sidebarElement = this.querySelector('#sidebar-drawer');
    const closeButton = this.querySelector('#closeSidebar');

    if (sidebarElement && closeButton) {
      SidebarPresenter.init({
        sidebarElement,
        closeButton,
      });
    }
  }
}

customElements.define('sidebar-page', Sidebar);
