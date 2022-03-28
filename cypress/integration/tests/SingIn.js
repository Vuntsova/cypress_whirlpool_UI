/// <reference types="cypress" />


describe('Sign In', () => {
  it('successfully signing in', () => {
    //
    cy.visit('/registration.html', { force: true });
    // Wait 2.5 sec and check for popup and if it shows, close it:
    cy.wait(2500);
    cy.get('body').then((body) => {
      if (body.find('.bgImage').length > 0) {
        cy.get('.close').click();
      }
    });
    //protect your password from “leaking” when running tests in interactive mode in
    //your local environment, pass the option { log: false }
    cy.get('#firstName').type(Cypress.env('first_name'));
    cy.get('#lastName').type(Cypress.env('last_name'));
    cy.get('#emailAddress').type(Cypress.env('emailAddress'));
    cy.get('#emailAddressConfirmation').type(Cypress.env('emailAddress'));
    cy.get('#password').type(Cypress.env('password'), { log: false });
    cy.get('#passwordConfirmation').type(Cypress.env('password'), {
      log: false,
    });

    cy.get(
      ':nth-child(1) > .registration-form__checkbox-container > .registration-form__check-mark'
    ).click();
    cy.get(
      ':nth-child(2) > .registration-form__checkbox-container > .registration-form__check-mark'
    ).click();

    cy.get('.registration-form__cta-btn > .button').click;
  })
})