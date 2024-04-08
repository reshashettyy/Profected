describe('Matching Button', () => {
  it('should navigate to the matching page when clicked', () => {
    cy.visit('http://localhost:3000/');

    cy.viewport(1200, 900);

    cy.contains('Get Matched').should('be.visible');

    cy.contains('Get Matched').click();

    cy.url().should('include', '/auth');
  });
});
