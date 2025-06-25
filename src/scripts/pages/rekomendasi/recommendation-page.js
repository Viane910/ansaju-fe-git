import RecommendationPresenter from './recom-presenter';
export default class RecommendationPage {
  #presenter = null;

  async render() {
    return `
    <header-page></header-page>
    <section class="h-screen !m-5 !p-5">
<div class="flex flex-col justify-center items-center">
	<div class="container mx-auto bg-[#98e4ae] rounded-lg !p-14">
		<form>
    <div class="text-center"><span class=" font-bold text-teal-700 text-3xl">Halo, Universitas dengan Jurusan Apa yang Ingin Kamu Cari?</span></div>
				<p class="font-normal text-center text-lg !my-6 text-gray-600">Carilah Universitasmu Berdasarkan Nama Jurusan</p>
				<div class="sm:flex items-center bg-white rounded-lg overflow-hidden !px-2 !py-1 justify-between outline-none border-2">
                    <select id="category" class="text-base font-medium text-gray-600 !px-4 !py-2 rounded-lg">
                        <option value="PTN" selected>Perguruan Tinggi Negeri (PTN)</option>
                        <option value="PTS">Perguruan Tinggi Swasta (PTS)</option>
                    </select>
					<input id="search-input" class="text-base text-gray-600 w-full outline-none !py-2 !px-2" type="text" placeholder="Kedokteran" />
					<div class="ms:flex items-center rounded-lg space-x-4 mx-auto !px-4 !py-4">
						<button id="search-button" class="bg-[#98e4ae] text-teal-700 font-semibold text-lg rounded-lg">Search</button>
					</div>
				</div>
		</form>
	</div>
    <!-- Result Section -->
<section class="!mt-10 w-full flex flex-col items-center">
  <div class="w-full max-w-5xl flex flex-col items-center">
    <ul id="ptn-list" class="space-y-4 w-full flex flex-col items-center"></ul>
    <ul id="pts-list" class="space-y-4 w-full flex flex-col items-center"></ul>
  </div>
</section>

</section>


</div>
    </section>
    `;
  }

  async afterRender() {
    this.#presenter = new RecommendationPresenter({
      view: this,
    });
    this.#presenter.searchEngine();
  }
}
