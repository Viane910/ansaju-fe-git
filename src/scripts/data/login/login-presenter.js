export default class LoginPresenter {
  #view;
  #model;
  #authModel;

  constructor({ view, model, authModel }) {
    this.#view = view;
    this.#model = model;
    this.#authModel = authModel;
  }

  async postLogin({ username, password }) {
    try {
      const response = await this.#model.postLogin({
        username,
        password,
      });

      if (!response.ok) {
        console.error('postLogin: response:', response);
        this.#view.loginFailed(response.message);
        return;
      }

      window.localStorage.setItem('user', JSON.stringify(response.data));
      const token = response.data?.token;
      if (!token) {
        console.error('postLogin: Missing token in response:', response);
        this.#view.loginFailed('Login failed: Invalid server response.');
        return;
      }
      this.#authModel.putAccessToken(token);

      this.#view.loginSuccessfully(response.message, response.data, response.loginResult);
    } catch (error) {
      console.error('getLogin: error:', error);
      this.#view.loginFailed(error.message);
    }
  }
}
