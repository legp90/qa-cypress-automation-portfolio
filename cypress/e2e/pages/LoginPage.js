class LoginPage {
    // Selectores de la página utilizando atributos data-test estándar
    elements = {
      usernameInput: () => cy.get('[data-test="username"]'),
      passwordInput: () => cy.get('[data-test="password"]'),
      loginButton: () => cy.get('[data-test="login-button"]'),
      errorMessage: () => cy.get('[data-test="error"]'),
    };
  
    // Acciones
    visit() {
      cy.visit('https://www.saucedemo.com/');
    }
  
    fillUsername(username) {
      if (username) {
        this.elements.usernameInput().clear().type(username);
      }
    }
  
    fillPassword(password) {
      if (password) {
        this.elements.passwordInput().clear().type(password);
      }
    }
  
    clickLogin() {
      this.elements.loginButton().click();
    }
  
    // Método integral de inicio de sesión
    login(username, password) {
      this.fillUsername(username);
      this.fillPassword(password);
      this.clickLogin();
    }
  }
  
  export default new LoginPage();