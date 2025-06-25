import HeaderPresenter from '../components-presenter/header-presenter.js';
import { getAccessToken } from '../utils/auth.js';

class HeaderPage extends HTMLElement {
  constructor() {
    super();
    // Gunakan Shadow DOM dengan benar
    // this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    HeaderPresenter.initHeaderPresenter(this);
    this.updateLoginState();
  }

  render() {
    this.innerHTML = `
      <nav class="bg-[#00bfff] mx-auto p-4 md:py-8">
        <!-- Brand (Logo + Text) -->
        <div class="flex items-center justify-between h-16 md:h-20">
          <div class="flex flex-row items-center gap-4">
            <a href="/" class="flex items-center space-x-3 gap-2">
              <img src="/logo.png" class="h-12 w-12 md:h-14 md:w-14" alt="Logo" />
              <span class="text-xl md:text-2xl font-semibold text-[#f8f8f6] whitespace-nowrap">Ansaju</span>
            </a>
            <!-- Desktop Navigation -->
            <div class="hidden md:flex flex-row gap-2 space-x-3"> 
              <ul class="flex flex-row p-4 gap-4 md:p-0 space-y-0 md:space-x-8 font-medium text-[#f8f8f6]">
                <li><a href="/" data-page="home" id="nav-link" class=" text-xl block px-3 py-2 rounded-md ">Beranda</a></li>
                <li><a href="/about" data-page="about" id="nav-link" class=" text-xl block px-3 py-2 rounded-md">Tentang</a></li>
                <!-- Desktop Dropdown -->
                <li class="nav-dropdown-container relative">
                  <button 
                    class="dropdown-trigger flex items-center justify-between px-3 py-2 rounded-md text-[#f8f8f6] hover:text-blue-200 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
                    data-page="testPotential"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-controls="dropdown-menu-testPotential"
                    id="nav-link-testPotential"
                  >
                    <span class="dropdown-text text-xl text-[#f8f8f6]">Area Potensial</span>
                    <svg class="dropdown-arrow w-5 h-5 text-[#f8f8f6] transition-transform duration-300 ease-in-out ml-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
                    </svg>
                  </button>

                  <!-- Dropdown Menu -->
                  <ul 
                    id="dropdown-menu-testPotential"
                    class="absolute left-0 top-full mt-1 w-48 bg-[#f8f8f6] text-[#1B6530] rounded-md shadow-lg border border-gray-200 opacity-0 invisible transform scale-95 transition-all duration-300 ease-in-out z-50"
                    role="menu"
                    aria-labelledby="nav-link-testPotential"
                  >
                    <li role="none">
                      <a href="/quiz" class="dropdown-item block px-4 py-3  hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 first:rounded-t-md" role="menuitem">
                        Kuis Potensial Akademik
                      </a>
                    </li>
                    <li role="none">
                      <a href="/rekomendasi" class="dropdown-item block px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200" role="menuitem">
                        Rekomendasi PTN & PTS
                      </a>
                    </li>
                    <li role="none">
                      <a href="/artikel" class="dropdown-item block px-4 py-3 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 last:rounded-b-md" role="menuitem">
                        Artikel Tips & Trik Memilih Jurusan
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <!-- Right controls (Profile + Menu Button) -->
          <div class="flex items-center space-x-4 rtl:space-x-reverse gap-2">
            <!-- Profile Dropdown -->
            <div class="relative">
              <!-- Profile Button -->
              <button type="button" id="user-menu-button" class="flex !p-2 focus:outline-none focus:ring-2 focus:ring-[#f8f8f6] focus:ring-offset-2 rounded-full transition-all duration-200 hover:shadow-lg">
                <img class="w-10 h-10 p-4 md:w-12 md:h-12 rounded-full" src="/component/iconOrg.png" alt="User photo" />
              </button>
              
              <!-- Dropdown Menu -->
              <div id="user-dropdown" class="hidden absolute right-0 top-14 mt-2 w-56 bg-[#f8f8f6] rounded-lg shadow-lg border border-gray-200 z-50">
                <!-- User Info Section -->
                <div class="px-4 py-3 border-b border-gray-100">
                  <p id="name" class="text-xl text-center font-medium text-[#1A508B]"></p>
                  <p id="email" class="text-lg text-center font-medium text-[#1B6530] truncate"></p>
                </div>
                
                <!-- Menu Items -->
                <div class="py-1">
                  <a href="/dashboard" class="flex items-center px-4 py-2 text-lg text-gray-600 font-medium hover:bg-gray-100 transition-colors duration-150">
                    <svg class="w-6 h-6 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Dashboard
                  </a>
                  <a href="/login" id="tab-login" class="flex items-center px-4 py-2 text-lg font-medium text-gray-600 hover:bg-gray-100 transition-colors duration-150">
                    <svg class="w-6 h-6 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                    </svg>
                    Login & Register
                  </a>
                </div>
                
                <!-- Logout -->
                <div class="tab-logout py-1">
                  <a href="#" id="logout-button" class="flex items-center px-4 py-2 text-lg font-medium text-red-600 hover:bg-red-50 transition-colors duration-150">
                    <svg class="w-6 h-6 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Keluar
                  </a>
                </div>
              </div>
            </div>

            <!-- Mobile Menu Button -->
            <div class="text-[#f8f8f6]">
            <button id="drawer-button" type="button" class="inline-flex items-center !p-2 w-10 h-10 justify-center rounded-lg md:hidden hover:bg-blue-600 focus:ring-2 focus:ring-white transition-colors duration-200">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            </div>
          </div>
        </div>

        <!-- Mobile Navigation Drawer -->
        <div id="navigation-drawer" class="hidden fixed top-0 right-0 w-64 h-full shadow-lg bg-[#f8f8f6] transform translate-x-full transition-transform duration-300 z-50">
          <!-- Close Button -->
          <div class="flex !px-4 !py-4 justify-end text-[#98e4ae] hover:text-red-600 ">
            <button id="drawer-close" class="transition-colors duration-200">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Mobile Navigation Links -->
          <ul class="flex flex-col p-4! space-y-2 font-medium text-[#1D5D9B]">
            <li><a href="/" data-page="home" id="nav-link-mobile" class="block !px-3 !py-2 rounded-md  hover:bg-blue-200 transition-colors duration-200">Beranda</a></li>
            <li><a href="/about" data-page="about" id="nav-link-mobile" class="block !px-3 !py-2 rounded-md hover:bg-blue-200 transition-colors duration-200">Tentang</a></li>
            <!-- Mobile Dropdown -->
            <li class="relative" id="dropdown-mobile-container">
              <button id="dropdown-mobile-trigger" class="flex items-center justify-between w-full !px-3 !py-2 rounded-md hover:bg-blue-200 transition-colors duration-200">
                Area Potensial
                <svg class="h-4 w-4 !ml-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <ul id="dropdown-mobile-menu" class="!mt-2 !ml-4 space-y-1 opacity-0 invisible max-h-0 overflow-hidden transition-all rounded-md duration-300 text-[#1B6530]">
                <li><a href="/quiz" class="block !px-4 !py-2 hover:bg-green-200 transition-colors duration-200 ">Kuis Potensial Akademik</a></li>
                <li><a href="/rekomendasi" class="block !px-4 !py-2 hover:bg-green-200 transition-colors duration-200">Rekomendasi PTN & PTS</a></li>
                <li><a href="/artikel" class="block !px-4 !py-2 hover:bg-green-200 transition-colors duration-200">Tips & Trik Memilih Jurusan</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    `;
  }

  updateLoginState() {
    const token = getAccessToken();
    const loginTab = document.querySelector('#tab-login');
    const logoutTab = document.querySelector('#logout-button');
    const nameField = document.querySelector('#name');
    const emailField = document.querySelector('#email');

    if (token) {
      if (loginTab) loginTab.style.display = 'none';
      if (logoutTab) logoutTab.style.display = 'flex';

      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        if (nameField) nameField.textContent = user.name || '';
        if (emailField) emailField.textContent = user.email || '';
      }
    } else {
      if (loginTab) loginTab.style.display = 'flex';
      if (logoutTab) logoutTab.style.display = 'none';

      if (nameField) nameField.textContent = '';
      if (emailField) emailField.textContent = '';
    }
  }
}

customElements.define('header-page', HeaderPage);
