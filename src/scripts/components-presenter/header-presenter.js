import { getAccessToken } from '../utils/auth.js';

const HeaderPresenter = {
  initHeaderPresenter() {
    // Setup drawer functionality
    const drawerBtn = document.getElementById('drawer-button');
    const drawer = document.getElementById('navigation-drawer');
    const closeBtn = document.getElementById('drawer-close');

    if (drawerBtn && drawer) {
      drawerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        drawer.classList.remove('translate-x-full');
        drawer.classList.add('translate-x-0');
        drawer.classList.remove('hidden');
        drawer.classList.add('block');
      });
    }

    if (closeBtn && drawer) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        drawer.classList.add('translate-x-full');
        drawer.classList.remove('translate-x-0');
        drawer.classList.remove('block');
        drawer.classList.add('hidden');
      });
    }

    // Close drawer when clicking outside
    document.addEventListener('click', (e) => {
      if (drawer && !drawer.contains(e.target) && !drawerBtn?.contains(e.target)) {
        drawer.classList.add('translate-x-full');
        drawer.classList.remove('translate-x-0');
      }
    });

    setupActiveNavigation();
    setupDropdown();
    setupDropdownMobile();
    profileDropdown();
  },
};

function setupActiveNavigation() {
  const setActiveNavigation = () => {
    const currentPath = window.location.pathname || '/';

    // Reset all navigation links
    document.querySelectorAll('#nav-link').forEach((link) => {
      link.classList.remove('text-blue-200', 'underline', 'underline-offset-8');
      link.classList.add('text-[#f8f8f6]');
    });

    document.querySelectorAll('#nav-link-mobile').forEach((link) => {
      link.classList.remove('text-blue-700', 'font-semibold', 'bg-blue-50');
      link.classList.add('text-[#1D5D9B]');
    });

    // Set active desktop link
    const activeDesktopLink = document.querySelector(`#nav-link[href="${currentPath}"]`);
    if (activeDesktopLink) {
      activeDesktopLink.classList.remove('text-[#f8f8f6]');
      activeDesktopLink.classList.add('text-blue-200', 'underline', 'underline-offset-8');
    }

    // Set active mobile link
    const activeMobileLink = document.querySelector(`#nav-link-mobile[href="${currentPath}"]`);
    if (activeMobileLink) {
      activeMobileLink.classList.remove('text-[#1D5D9B]');
      activeMobileLink.classList.add('text-blue-700', 'font-semibold', 'bg-blue-50');
    }
  };

  // Setup navigation click handlers
  document.querySelectorAll('#nav-link').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.pathname = link.getAttribute('href');
    });
  });

  document.querySelectorAll('#nav-link-mobile').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.pathname = link.getAttribute('href');

      // Close mobile drawer after navigation
      const drawer = document.getElementById('navigation-drawer');
      if (drawer) {
        drawer.classList.add('translate-x-full');
        drawer.classList.remove('translate-x-0');
      }
    });
  });

  // Listen for navigation changes
  window.addEventListener('popstate', setActiveNavigation);
  setActiveNavigation();
}

function setupDropdown() {
  const dropdownTrigger = document.getElementById('nav-link-testPotential');
  const dropdownMenu = document.getElementById('dropdown-menu-testPotential');

  if (!dropdownTrigger || !dropdownMenu) return;

  let isOpen = false;

  function toggleDropdown() {
    isOpen = !isOpen;
    dropdownTrigger.setAttribute('aria-expanded', isOpen.toString());

    if (isOpen) {
      dropdownMenu.classList.remove('opacity-0', 'invisible', 'scale-95');
      dropdownMenu.classList.add('opacity-100', 'visible', 'scale-100');
    } else {
      dropdownMenu.classList.add('opacity-0', 'invisible', 'scale-95');
      dropdownMenu.classList.remove('opacity-100', 'visible', 'scale-100');
    }
  }

  function closeDropdown() {
    isOpen = false;
    dropdownTrigger.setAttribute('aria-expanded', 'false');
    dropdownMenu.classList.add('opacity-0', 'invisible', 'scale-95');
    dropdownMenu.classList.remove('opacity-100', 'visible', 'scale-100');
  }

  dropdownTrigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleDropdown();
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdownTrigger.contains(e.target) && !dropdownMenu.contains(e.target)) {
      closeDropdown();
    }
  });

  // Keyboard navigation
  dropdownTrigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleDropdown();
    } else if (e.key === 'Escape') {
      closeDropdown();
    }
  });
}

function setupDropdownMobile() {
  const trigger = document.getElementById('dropdown-mobile-trigger');
  const menu = document.getElementById('dropdown-mobile-menu');

  if (!trigger || !menu) return;

  let isOpen = false;

  function toggleDropdown() {
    isOpen = !isOpen;
    const arrow = trigger.querySelector('svg');

    if (isOpen) {
      menu.classList.remove('opacity-0', 'invisible', 'max-h-0');
      menu.classList.add('opacity-100', 'visible', 'max-h-96');
      if (arrow) arrow.style.transform = 'rotate(180deg)';
    } else {
      menu.classList.add('opacity-0', 'invisible', 'max-h-0');
      menu.classList.remove('opacity-100', 'visible', 'max-h-96');
      if (arrow) arrow.style.transform = 'rotate(0deg)';
    }
  }

  trigger.addEventListener('click', (e) => {
    // e.preventDefault();
    console.log(e);
    // e.stopPropagation();
    toggleDropdown();
  });
}

function profileDropdown() {
  const userMenuButton = document.getElementById('user-menu-button');
  const userDropdown = document.getElementById('user-dropdown');
  const logoutButton = document.getElementById('logout-button');
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');

  if (!userMenuButton || !userDropdown) return;

  // Toggle profile dropdown
  userMenuButton.addEventListener('click', (e) => {
    e.stopPropagation();

    const isHidden = userDropdown.classList.contains('hidden');

    if (isHidden) {
      userDropdown.classList.remove('hidden');

      // Animate in
      userDropdown.style.opacity = '0';
      userDropdown.style.transform = 'translateY(-10px)';

      requestAnimationFrame(() => {
        userDropdown.style.transition = 'opacity 0.2s ease-out, transform 0.2s ease-out';
        userDropdown.style.opacity = '1';
        userDropdown.style.transform = 'translateY(0)';
      });

      // Update user info
      const storage = localStorage.getItem('user');
      if (nameEl && emailEl) {
        if (storage) {
          const user = JSON.parse(storage);
          nameEl.textContent = user.name || 'Guest';
          emailEl.textContent = user.email || 'guest@example.com';
        } else {
          nameEl.textContent = 'Guest';
          emailEl.textContent = 'guest@example.com';
        }
      }
    } else {
      userDropdown.classList.add('hidden');
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!userMenuButton.contains(e.target) && !userDropdown.contains(e.target)) {
      userDropdown.classList.add('hidden');
    }
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      userDropdown.classList.add('hidden');
    }
  });

  // Profile button hover effects
  userMenuButton.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.05)';
  });

  userMenuButton.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1)';
  });

  // Logout functionality
  if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      userDropdown.classList.add('hidden');

      const confirmLogout = confirm('Apakah Anda yakin ingin keluar?');
      if (confirmLogout) {
        localStorage.clear();
        alert('Anda telah keluar dari sistem');
        window.location.pathname = '/login';
      } else {
        alert('Yey, kamu masih stay di Ansaju!');
      }
    });
  }
}

export default HeaderPresenter;
