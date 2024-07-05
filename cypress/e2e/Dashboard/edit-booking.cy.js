/// <reference types="cypress" />

describe('Check edit-booking functionality', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
        cy.get('#username').type('John')
        cy.get('#password').type(1234);
        cy.get('form').submit()
      })

      it('Check that p element is changed for input element when on edit mode', () => {
        cy.get('a[href="/bookings"]').click()
        cy.get('a[href="/bookings/1234"]').click()
        cy.get('.edit').click()
        cy.get('div').contains('p', 'Check In').parent('div').find('input').should('exist')
        cy.get('div').contains('p', 'Check In').parent('div').should('not.contain', 'p')
      })
})