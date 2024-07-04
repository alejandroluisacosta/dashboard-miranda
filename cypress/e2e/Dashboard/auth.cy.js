/// <reference types="cypress" />

describe('Authentication testing', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/')
    })

    it('Check for redirection to index page given correct credentials', () => {
        cy.get('#username').type('John')
        cy.get('#password').type('1234')
        cy.get('form').submit();
        cy.location('pathname').should('eq', '/')
    })

    it('Check for redirection to login page given incorrect credentials', () => {
        cy.get('#username').type('Johnny Bravo')
        cy.get('#password').type('1234')
        cy.get('form').submit();
        cy.location('pathname').should('eq', '/login')
    })
})