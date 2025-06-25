import LoginPresenter from './login-presenter';
import * as DataAPI from '../api';
import * as Auth from '../../utils/auth';

export default class Login {
  #presenter = null;

  async render() {
    return `
    <section class="gap-6 sm:gap-10 flex flex-col sm:flex-row items-center justify-center min-h-screen bg-[conic-gradient(rgba(0,191,255,0.35)),url('/images/bg-left.png')] bg-no-repeat bg-cover !px-4 !py-6">
      <span class="text-center text-3xl sm:text-5xl text-white font-semibold !px-2">Jelajahi dan Raih Mimpimu Bersama Ansaju</span>
      <div class="bg-white rounded-3xl border-8 border-[#1A508B] w-full max-w-md shadow-lg !px-4 !py-6 sm:p-8 ">
        <div class="text-center justify-center bg-[#00bfff]">
        <span class="text-[#1A508B] text-center text-3xl sm:text-4xl font-bold mb-2">Log in</span>
        <p class="text-[#f8f8f6] text-center !mb-6 text-base font-semibold sm:text-base">Selamat Datang Kembali Teman!</p>
        </div>
        <form id="login-form" class="flex flex-col gap-4 items-center">
          <div class="flex flex-col my-2 w-full sm:w-9/12">
            <label for="username" class="text-[#1A508B] text-base sm:text-lg font-semibold mb-1 sm:mb-2">Username</label>
            <input type="text" id="username" class="border-2 border-[#1A508B] rounded-lg px-3 py-2 focus:outline-none focus:border-[#98e4ae] transition text-sm sm:text-base" required>
          </div>
          <div class="flex flex-col my-2 w-full sm:w-9/12">
            <label for="password" class="text-[#1A508B] text-base sm:text-lg font-semibold mb-1 sm:mb-2">Password</label>
            <input type="password" id="password" class="border-2 border-[#1A508B] rounded-lg px-3 py-2 focus:outline-none focus:border-[#98e4ae] transition text-sm sm:text-base" required>
          </div>
          <button type="submit" id="submit" class="bg-[#1A508B] text-white w-24 text-base sm:text-lg font-semibold rounded-lg py-2 mt-2 hover:bg-[#98e4ae] transition duration-300 ease-in-out">Log In</button>
        </form>

        <div id="loginLoading" class="hidden justify-center items-center mb-4">
          <svg class="animate-spin h-6 w-6 sm:h-8 sm:w-8 text-[#1A508B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          <span class="ml-2 text-[#1A508B] font-semibold text-sm sm:text-base">Logging in...</span>
        </div>

        <p class="text-center text-[#1A508B] mt-4 sm:mt-6 text-xs sm:text-sm">
          Belum Punya Akun?
          <a href="/register" class="text-[#98e4ae] hover:underline font-semibold">Register</a>
        </p>
      </div>
    </section>
    `;
  }

  async afterRender() {
    this.#presenter = new LoginPresenter({
      view: this,
      model: DataAPI,
      authModel: Auth,
    });

    this.#setupForm();
    this.loadingEl = document.getElementById('loginLoading');
    this.formEl = document.getElementById('login-form');
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
    document.getElementById('login-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      this.#showLoading(true);
      const data = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
      };
      await this.#presenter.postLogin(data);
      this.#showLoading(false);
    });
  }

  loginSuccessfully(message) {
    this.#showLoading(false);
    console.log(message);
    location.pathname = '/';
  }

  loginFailed(message) {
    this.#showLoading(false);
    alert(message);
  }
}
