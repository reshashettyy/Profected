describe('Navigation Bar', () => {
  it('has a Home button that redirects to the landing page', () => {
    // Visit a page where the navigation bar is present
    cy.visit('/');

    // Check for the presence of the Home button
    cy.get('a').contains('Home').should('be.visible');

    // Click the Home button
    cy.get('a').contains('Home').click();

    // Verify that the URL is now the landing page
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
