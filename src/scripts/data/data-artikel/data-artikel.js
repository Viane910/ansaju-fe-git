const DataArtikel = {
  data: [
    {
      id: 1,
      img: '/article-img/article-1.jpg',
      judul: 'Stres Salah Jurusan? Kenali Diri Kamu Yuk!',
      isi: 'Memilih jurusan kadang terasa membingungkan, apalagi jika kamu merasa belum cukup mengenal dirimu sendiri. Saat melihat teman-teman sudah mantap dengan pilihannya, wajar kalau kamu mulai stres. Tapi justru di situlah pentingnya proses refleksi. Mulailah dengan bertanya pada diri sendiri: apa yang membuatmu semangat? Pelajaran apa yang kamu sukai? Aktivitas seperti apa yang kamu rela lakukan meski tidak dibayar?',
      isi2: 'Mengenal diri bukan hanya soal hobi, tapi juga tentang kepribadian dan gaya belajar. Kamu bisa coba tes minat bakat online, membuat jurnal, atau berdiskusi dengan guru BK. Jangan terburu-buru memilih hanya karena tekanan sekitar. Proses ini akan membantumu memilih jurusan yang benar-benar selaras dengan dirimu, bukan sekadar mengikuti tren.',
    },
    {
      id: 2,
      img: '/article-img/article-2.jpg',
      judul: 'Coba Banyak Hal, Lalu Fokuskan!',
      isi: 'Sebelum memutuskan jurusan, cobalah menjelajahi berbagai bidang terlebih dahulu. Baca buku dari beragam topik, ikut webinar, atau gabung komunitas belajar. Dengan mencoba banyak hal, kamu akan mendapatkan gambaran lebih luas tentang dunia akademik dan profesi yang terkait dengan berbagai jurusan. Dari situ, kamu bisa mulai menyaring mana yang benar-benar membuatmu tertarik.',
      isi2: 'Kegiatan ini tidak hanya memperluas wawasan, tapi juga membantumu menemukan passion yang mungkin sebelumnya tersembunyi. Misalnya, kamu mungkin tidak menyangka bahwa setelah membaca novel sejarah, kamu tertarik dengan Ilmu Sejarah atau Antropologi. Atau setelah ikut kelas coding singkat, kamu jadi tertarik ke Informatika. Proses eksplorasi ini penting agar pilihanmu lebih tepat sasaran.',
    },
    {
      id: 3,
      img: '/article-img/article-3.jpg',
      judul: 'Belajar Mandiri Bikin Kamu Lebih Tahu Apa yang Cocok',
      isi: 'Salah satu cara terbaik untuk mengenali kecocokanmu dengan jurusan tertentu adalah dengan mencoba belajar sendiri terlebih dahulu. Internet menyediakan banyak materi gratis, mulai dari video kuliah, artikel, e-book, hingga forum diskusi. Pilih topik yang berhubungan dengan jurusan incaranmu, dan coba pahami dasarnya. Jika kamu merasa tertantang dan menikmati proses belajarnya, besar kemungkinan jurusan itu cocok untukmu.',
      isi2: 'Belajar mandiri juga menunjukkan sejauh mana motivasimu dalam bidang tertentu. Apakah kamu hanya tertarik sesaat, atau kamu benar-benar ingin mendalami? Dengan mengasah keingintahuan secara otodidak, kamu akan punya modal awal yang kuat saat nanti benar-benar terjun ke bangku kuliah.',
    },
    {
      id: 4,
      img: '/article-img/article-4.jpg',
      judul: 'Eksperimen & Proyek Kecil: Uji Jurusan Pilihanmu!',
      isi: 'Jika kamu tipe yang suka melakukan eksperimen, menyusun catatan rumit, atau membuat proyek kreatif, itu bisa menjadi petunjuk jurusan yang cocok buatmu. Coba buat proyek mini yang relevan dengan bidang yang kamu incar. Misalnya, buat artikel investigasi jika tertarik Jurnalistik, atau coba merancang aplikasi sederhana jika tertarik ke Teknologi Informasi. Kegiatan ini membantumu merasakan dunia nyata dari jurusan tersebut.',
      isi2: 'Selain menambah pengalaman, proyek-proyek kecil ini bisa kamu dokumentasikan sebagai portofolio. Bahkan, ini akan sangat berguna saat mendaftar ke kampus atau beasiswa. Lebih dari itu, kamu jadi punya gambaran apakah kamu nyaman dengan proses kerja di bidang tersebut. Karena kadang, teori terlihat menarik, tapi praktiknya justru kurang cocok — proyek kecil akan membantumu menyadari hal itu lebih awal.',
    },
  ],
};

const ArtikelLocal = {
  async getAllArticle() {
    return [...DataArtikel.data];
  },

  async getArticleById(id) {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      throw new Error('Invalid ID: ID harus berupa angka');
    }

    const articles = await this.getAllArticle();
    const selectedArticle = articles.find((article) => article.id === numericId);

    if (!selectedArticle) {
      throw new Error(`Article with id ${id} was not found`);
    }

    return selectedArticle;
  },
};

export default ArtikelLocal;
