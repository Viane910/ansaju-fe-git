export default class RegisterPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  async postRegister({ name, email, username, password }) {
    try {
      const response = await this.#model.postRegister({
        name,
        email,
        username,
        password,
      });

      if (!response.ok) {
        console.error('postRegister: response:', response);
        this.#view.registeredFailed(response.message);
        return;
      }

      this.#view.registeredSuccessfully(response.message, response.data);
    } catch (error) {
      console.error('postRegister: error:', error);
      this.#view.registeredFailed(error.message);
    }
  }
}
