import loginPage from '../pages/LoginPage';

describe('SauceDemo - Módulo de Autenticación E2E', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it('TC-01: Debe iniciar sesión exitosamente con credenciales válidas', () => {
    loginPage.login('standard_user', 'secret_sauce');

    // Verificaciones post-login
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('be.visible').and('have.text', 'Products');
  });

  it('TC-02: Debe mostrar error al intentar acceder con un usuario bloqueado', () => {
    loginPage.login('locked_out_user', 'secret_sauce');

    loginPage.elements.errorMessage()
      .should('be.visible')
      .and('contain.text', 'Epic sadface: Sorry, this user has been locked out.');
  });

  it('TC-03: Debe rechazar el acceso con credenciales incorrectas', () => {
    loginPage.login('invalid_user', 'wrong_password');

    loginPage.elements.errorMessage()
      .should('be.visible')
      .and('contain.text', 'Epic sadface: Username and password do not match any user in this service');
  });

  it('TC-04: Debe validar campos obligatorios cuando los inputs están vacíos', () => {
    loginPage.clickLogin();

    loginPage.elements.errorMessage()
      .should('be.visible')
      .and('contain.text', 'Epic sadface: Username is required');
  });
});