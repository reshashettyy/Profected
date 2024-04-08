describe('Matching Button', () => {
  it('should navigate to the matching page when clicked', () => {
    // Visit the landing page

    cy.visit('http://localhost:3000/');

    // Click the matching button
    cy.contains('Get Matched').click();

    cy.on('uncaught:exception', (err, runnable) => {
      console.error('Uncaught exception:', err.message);
      return false;
    });

    cy.url().should('include', '/auth');
  });
});
