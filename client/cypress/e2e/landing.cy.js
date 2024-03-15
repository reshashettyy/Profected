describe('Matching Button', () => {
    it('should navigate to the matching page when clicked', () => {
      // Visit the landing page
      cy.visit('http://localhost:3000/');
  
      // Click the matching button
      cy.contains('Get Matched').click();
  
      // Assert that the URL contains '/matching' indicating navigation to the matching page
      cy.url().should('include', '/matching');
    });
  });
  