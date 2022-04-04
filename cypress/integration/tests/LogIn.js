/// <reference types="cypress" />

describe('Log In', () => {
  beforeEach(() => {
    cy.visit('');
    // cy.injectAxe();
    // Wait 2.5 sec and check for popup and if it shows, close it:
    cy.wait(2500);
    cy.get('body').then((body) => {
      if (body.find('.bgImage').length > 0) {
        cy.get('.close').click();
      }
    });
    cy.get(
      '.sign-in-account__link-log-in > .sign-in-account__icon > .icon > path'
    ).click();
  });

  //Verify if a user will be able to login with a valid username and valid password. Positive Tets.
  it('Successfully logging in with a valid username and valid password', () => {
    cy.get('#headerSigninEmail').type(Cypress.env('emailAddress'));
    cy.get('#modalSigninPassword').type(Cypress.env('password'), {
      log: false,
    });
    cy.get('#login-form > .form-buttons > .form-button').click();
    
    //Validate Successfull LogIn
    cy.get('.breadcrumbs-list-item-last').should('be.visible');
  });

  //Verify if a user cannot login with a valid username and an invalid password. Negative Test.
  it('Unsuccessful  logging atempt when a valid username and invalid password are provided', () => {
    cy.get('#headerSigninEmail').type(Cypress.env('emailAddress'));
    cy.get('#modalSigninPassword').type(Cypress.env('invalid_password'), {
      log: false,
    });
    cy.get('#login-form > .form-buttons > .form-button').click();
    cy.get('.form-submit-error').should('be.visible');
  });

  //Verify the login page for both, when the field is blank and Submit button is clicked. Negative Test.
  it('Unsuccessful logging atempt when the email field is blank and Submit button is clicked', () => {
    cy.get('#modalSigninPassword').type(Cypress.env('password'), {
      log: false,
    });

    cy.get('#login-form > .form-buttons > .form-button').click();
    cy.get('.form-error-items.filled').should('be.visible');
  });

  //Verify the ‘Forgot Password’ functionality. Positive Test.
  it('Checks "Forgot Password" functionality', () => {
    cy.get('.login-forgot-password-link').click();
    cy.url().should('include', '/forgot-password.html');
  });

  //Verify the messages for invalid login. Positive Test
  it('Checks messages for invalid login', () => {
    cy.get('#headerSigninEmail').type(Cypress.env('emailAddress'));
    cy.get('#modalSigninPassword').type(Cypress.env('invalid_password'), {
      log: false,
    });
    cy.get('#login-form > .form-buttons > .form-button').click();
    cy.get('.form-submit-error').should('be.visible');
  });

  //Verify if the ‘Enter’ key of the keyboard is working correctly on the login page.	Positive Test
  // it('Checks if the "Enter" key of the keyboard is working', () => {
  //   cy.get('#headerSigninEmail').type(Cypress.env('emailAddress'));
  //   cy.get('#modalSigninPassword').type(Cypress.env('password'), {
  //     log: false,
  //   });
  //   cy.get('#modalSigninPassword').type('{enter}');
  //   //failing this to test allure
  //   cy.get('.breadcrumbs-list-item-last').should('not.be.visible');
  // });
});