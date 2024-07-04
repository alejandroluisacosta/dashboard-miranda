/// <reference types="cypress" />

describe('Dashboard', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/')
    })

    it('check for redirection to index page given correct credentials', () => {
        cy.get('#username').type('John')
        cy.get('#password').type('1234')
        cy.get('form').submit();
        cy.location('pathname').should('eq', '/')
    })
})