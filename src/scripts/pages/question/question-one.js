import QuestionPresenter from '../question/question-presenter';
import * as DataAPI from '../../data/api';

export default class QuestionOne {
  #presenter = null;
  #page;
  #limit;
  #questions = [];
  #answers = [];

  async render() {
    return `
    <header-page></header-page>
<section class="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-100 !px-4 !py-8">
  <!-- Container utama -->
  <div class="w-full max-w-2xl bg-white rounded-3xl shadow-lg border-4 border-[#00bfff] overflow-hidden">
    <!-- Header -->
    <div class="bg-[#00bfff] text-white text-center !px-6 !py-6">
      <span class="text-3xl sm:text-4xl font-bold text-[#1A508B]">Tes Potensial Akademik</span>
      <p class="!mt-2 text-xl font-semibold sm:text-lg text-[#f8f8f6]">Pertanyaan ini adalah langkah awal untuk menentukan jurusanmu</p>
    </div>

    <!-- Quiz Content -->
    <div class="!p-6 sm:p-8 space-y-6">
      <div id="quiz" class="space-y-4"></div>

      <!-- Navigasi -->
      <div class="flex justify-between items-center pt-4 ">
        <button id="prev" class=" rounded-lg shadow-md hover:brightness-110 transition duration-300">
          <span class="text-[#f8f8f6] bg-[#98e4ae] font-semibold !px-6 !py-2 text-base">Prev</span>
        </button>
        <button id="next" class=" rounded-lg shadow-md hover:brightness-110 transition duration-300">
          <span class="text-[#f8f8f6] bg-[#00bfff] font-semibold !px-6 !py-2 text-base">Next</span>
        </button>
      </div>

      <!-- Submit -->
      <div class="flex justify-center !pt-4">
        <button id="submit" class=" font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition transform duration-300">
          <span class="text-[#f8f8f6] bg-[#1A508B] font-semibold !px-6 !py-2 text-base">submit</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Result -->
  <div class="w-full max-w-2xl !mt-6 !px-4">
    <div id="result-container" class="!p-6 sm:p-8 bg-white border-2 border-blue-200 rounded-xl shadow-md text-center">
      <span class="text-2xl font-semibold text-teal-700 !mb-2">Hasil Rekomendasi Jurusan</span>
      <p id="result-text" class="text-xl font-semibold text-[#1A508B] !mb-2"></p>
    </div>
  </div>
</section>

<footer-page></footer-page>

    `;
  }

  async afterRender() {
    this.#presenter = new QuestionPresenter({
      view: this,
      model: DataAPI,
    });
    this.#page = 0;
    this.#limit = 4;
    this.#presenter.init();
    this.#buttonNext();
    this.#buttonPrev();
    this.#listenerRadio();
    this.#listenSubmit();
  }

  showResult(data) {
    const resultText = document.getElementById('result-text');
    if (data && data.jurusan) {
      resultText.textContent = `${data.jurusan}`;
    } else {
      resultText.textContent = 'Tidak ada hasil rekomendasi.';
    }
  }

  #buttonNext() {
    const nextButton = document.getElementById('next');
    nextButton.addEventListener('click', (event) => {
      event.preventDefault();

      const maxPage = this.#questions.length;
      if (this.#page + this.#limit < maxPage) {
        this.#page += this.#limit;
        this.#presenter.init();
      }
    });
  }

  #buttonPrev() {
    const prevButton = document.getElementById('prev');
    prevButton.addEventListener('click', (event) => {
      event.preventDefault();

      if (this.#page - this.#limit >= 0) {
        this.#page -= this.#limit;
        this.#presenter.init();
      }
    });
  }

  #listenerRadio() {
    const questionElements = document.querySelectorAll('input[type="radio"]');
    questionElements.forEach((element) => {
      element.addEventListener('change', (event) => {
        const questionIndex = parseInt(event.target.name.split('-')[1], 10);
        const selectedValue = event.target.value;

        // this.#answers[questionIndex] = { value: selectedValue };
        this.#answers[questionIndex] = parseInt(selectedValue, 10);
      });
    });
  }

  #listenSubmit() {
    const submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', async (event) => {
      event.preventDefault();

      if (this.#answers.filter((ans) => typeof ans === 'number').length < this.#questions.length) {
        alert('Silakan jawab semua pertanyaan sebelum melanjutkan.');
        return;
      }
      await this.#presenter.postRecommendations({ answer: this.#answers });
    });
  }

  displayQuestion(questions) {
    this.#questions = questions;

    const container = document.getElementById('quiz');
    if (!questions.length) {
      container.innerHTML = '<p>Tidak ada Data.</p>';
      return;
    }

    const questionList = this.#questions.slice(this.#page, this.#page + this.#limit);

    container.innerHTML = questionList
      .map((question, indexOnPage) => {
        const globalIndex = this.#page + indexOnPage;
        const savedAnswer = this.#answers[globalIndex]?.value;

        return `
        <div class="question-${globalIndex} flex flex-col gap-2 !pb-2">
          <span class="text-lg font-semibold mb-2 text-[#1A508B]">${question.question}</span>
          <div class="flex justify-between w-full px-4">
            <p class="text-left text-based font-semibold text-teal-700">Kurang Setuju</p>
            <p class="text-right text-based font-semibold text-teal-700">Lebih Setuju</p>
          </div>

          <div class="flex gap-10 justify-center sm">
            ${question.options
              .map((option, i) => {
                const isChecked = savedAnswer === option.value ? 'checked' : '';
                return `
                  <input class="w-4 h-4" type="radio" name="question-${globalIndex}" value="${option.value}" id="option-${globalIndex}-${i}" ${isChecked} />
                `;
              })
              .join('')}
          </div>
        </div>
      `;
      })
      .join('');

    this.#listenerRadio();
  }
}
