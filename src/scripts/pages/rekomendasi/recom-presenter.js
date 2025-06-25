import DataUniversitas from '../../data/universitas/data-universitas';

export default class RecommendationPresenter {
  #view;
  #presenter;

  constructor({ view, presenter }) {
    this.#view = view;
    this.#presenter = presenter;
  }

  async searchEngine() {
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category');
    const ptnList = document.getElementById('ptn-list');
    const ptsList = document.getElementById('pts-list');
    const searchButton = document.getElementById('search-button');

    const renderList = (data, container, emptyMessage) => {
      container.innerHTML = '';

      if (data.length === 0) {
        const li = document.createElement('li');
        li.textContent = emptyMessage;
        li.classList.add('text-red-600', 'font-medium', 'py-2');
        container.appendChild(li);
        return;
      }

      data.forEach((univ) => {
        const li = document.createElement('div');
        li.classList.add(
          'flex',
          'items-center',
          'gap-6',
          'bg-[#f8f8f6]',
          'shadow-lg',
          '!p-6',
          '!mb-4',
          'rounded-xl',
          'w-full',
          'max-w-3xl',
          'text-lg',
        );

        const img = document.createElement('img');
        img.src = univ.img;
        img.alt = univ.nama;
        img.classList.add('w-20', 'h-20', 'object-cover', 'rounded-md');

        const text = document.createElement('span');
        text.textContent = univ.nama;
        text.classList.add('text-xl', 'font-semibold', 'text-gray-700');

        li.appendChild(img);
        li.appendChild(text);
        container.appendChild(li);
      });
    };

    const doSearch = () => {
      const keyword = searchInput.value.trim().toLowerCase();
      const selectedCategory = categorySelect.value;

      ptnList.innerHTML = '';
      ptsList.innerHTML = '';

      if (keyword === '') {
        renderList([], selectedCategory === 'PTN' ? ptnList : ptsList, 'tidak ada hasil');
        return;
      }

      const filtered = DataUniversitas.data.filter(
        (univ) =>
          univ.tipe === selectedCategory &&
          univ.jurusan.some((jurusan) => jurusan.toLowerCase().includes(keyword)),
      );

      const message = 'Tim Ansaju Belum Update nih! Pantengin Website Kita Terus ya!';
      if (selectedCategory === 'PTN') {
        renderList(filtered, ptnList, message);
      } else if (selectedCategory === 'PTS') {
        renderList(filtered, ptsList, message);
      }
    };

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        doSearch();
      }
    });

    searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      doSearch();
    });

    renderList([], ptnList, '');
    renderList([], ptsList, '');
  }
}
