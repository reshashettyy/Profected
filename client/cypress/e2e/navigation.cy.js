describe('Navigation Bar', () => {
  it('has a Home button that redirects to the landing page', () => {
    cy.visit('/');

    cy.on('uncaught:exception', (err, runnable) => {
      console.error('Uncaught exception:', err.message);
      return false;
    });

    cy.get('a').contains('Home').should('be.visible');

    cy.get('a').contains('Home').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
