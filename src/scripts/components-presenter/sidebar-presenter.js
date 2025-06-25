const SidebarPresenter = {
  init({ sidebarElement, closeButton }) {
    const openButton = document.getElementById('open-sidebar');

    if (openButton) {
      openButton.addEventListener('click', () => {
        // Menampilkan sidebar dengan mengubah transform
        sidebarElement.style.transform = 'translateX(0)';
      });
    }

    if (closeButton) {
      closeButton.addEventListener('click', () => {
        // Menyembunyikan sidebar dengan mengubah transform
        sidebarElement.style.transform = 'translateX(-100%)';
      });
    }
  },

  initPresenter() {
    // Tunggu sampai DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupSidebar();
      });
    } else {
      this.setupSidebar();
    }
  },

  setupSidebar() {
    const sidebarElement = document.getElementById('sidebar-drawer');
    const closeButton = document.getElementById('closeSidebar');

    if (sidebarElement && closeButton) {
      // Set initial state - sidebar tersembunyi
      sidebarElement.style.transform = 'translateX(-100%)';
      sidebarElement.style.transition = 'transform 0.3s ease-in-out';

      this.init({ sidebarElement, closeButton });
    } else {
      console.warn('Sidebar elements not found:', {
        sidebarElement: !!sidebarElement,
        closeButton: !!closeButton,
      });
    }
  },
};

export default SidebarPresenter;
