import RegisterPresenter from './register-presenter';
import * as DataAPI from '../api.js';

export default class Register {
  #presenter = null;

  async render() {
    return `
    <section class="gap-6 flex flex-col items-center justify-center min-h-screen bg-[conic-gradient(rgba(152,228,174,0.35)),url('/images/bg-right.png')] bg-no-repeat bg-cover !px-4 !py-6 sm:gap-10 sm:flex-row">
      <span class="text-center text-3xl sm:text-5xl text-[#f8f8f8] font-medium !px-2">Kenali Potensimu Bersama Ansaju</span>
      <div class="bg-white rounded-3xl border-8 border-[#1B6530] w-full max-w-md shadow-lg !px-4 !py-6 sm:p-8">
        <div class="text-center justify-center bg-[#98e4ae]">
        <span class="text-[#1B6530] text-3xl sm:text-4xl font-bold !mb-2">Register</span>
        <p class="text-[#f8f8f6] !mb-6 text-base font-semibold sm:text-base">Ayo Buat Akunmu!</p>
        </div>
        <!-- FORM AREA -->
        <form id="registerForm" class="flex flex-col gap-4 items-center">
          <div class="flex flex-col my-2 w-full sm:w-9/12">
            <label for="name" class="text-[#1B6530] text-base sm:text-lg font-semibold mb-1 sm:mb-2">Name</label>
            <input type="text" id="name" class="border-2 border-[#1B6530] rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bfff] transition text-sm sm:text-base" required>
          </div>
          <div class="flex flex-col my-2 w-full sm:w-9/12">
            <label for="email" class="text-[#1B6530] text-base sm:text-lg font-semibold mb-1 sm:mb-2">Email</label>
            <input type="email" id="email" class="border-2 border-[#1B6530] rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bfff] transition text-sm sm:text-base" required>
          </div>
          <div class="flex flex-col my-2 w-full sm:w-9/12">
            <label for="username" class="text-[#1B6530] text-base sm:text-lg font-semibold mb-1 sm:mb-2">Username</label>
            <input type="text" id="username" class="border-2 border-[#1B6530] rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bfff] transition text-sm sm:text-base" required>
          </div>
          <div class="flex flex-col my-2 w-full sm:w-9/12">
            <label for="password" class="text-[#1B6530] text-base sm:text-lg font-semibold mb-1 sm:mb-2">Password</label>
            <input type="password" id="password" class="border-2 border-[#1B6530] rounded-lg px-3 py-2 focus:outline-none focus:border-[#00bfff] transition text-sm sm:text-base" required>
          </div>
          <button type="submit" id="submit" class="bg-[#1B6530] text-white w-24 text-base sm:text-lg font-semibold rounded-lg py-2 mt-2 hover:bg-[#00bfff] transition duration-300 ease-in-out">Register</button>
        </form>
        <!-- FORM AREA ENDS -->

        <div id="registerLoading" class="hidden justify-center items-center mb-4">
          <svg class="animate-spin h-6 w-6 sm:h-8 sm:w-8 text-[#00bfff]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          <span class="ml-2 text-[#1B6530] font-semibold text-sm sm:text-base">Registering...</span>
        </div>

        <p class="text-center text-[#1B6530] mt-4 sm:mt-6 text-xs sm:text-sm">
          Sudah punya akun?
          <a href="/login" class="text-[#00bfff] hover:underline font-semibold">Login</a>
        </p>
      </div>
    </section>
    `;
  }

  async afterRender() {
    this.#presenter = new RegisterPresenter({
      view: this,
      model: DataAPI,
    });
    this.#setupForm();
    this.loadingEl = document.getElementById('registerLoading');
    this.formEl = document.getElementById('registerForm');
  }

  #showLoading(show) {
    if (this.loadingEl && this.formEl) {
      if (show) {
        this.loadingEl.classList.remove('hidden');
        this.loadingEl.classList.add('flex');
        this.formEl.classList.add('opacity-50', 'pointer-events-none');
      } else {
        this.loadingEl.classList.add('hidden');
        this.loadingEl.classList.remove('flex');
        this.formEl.classList.remove('opacity-50', 'pointer-events-none');
      }
    }
  }

  #setupForm() {
    document.getElementById('registerForm').addEventListener('submit', async (event) => {
      event.preventDefault();
      this.#showLoading(true);
      const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
      };
      await this.#presenter.postRegister(data);
      this.#showLoading(false);
    });
  }

  registeredSuccessfully(message) {
    this.#showLoading(false);
    alert(message);
    console.log(message);
    location.href = '/login';
  }

  registeredFailed(message) {
    this.#showLoading(false);
    alert(message);
  }
}
