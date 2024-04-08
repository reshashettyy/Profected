describe('Sign up slide test', () => {
    beforeEach(() => {
      cy.visit('/auth'); 
    });
  
    it('Should slide to create account when sign up button is clicked', () => {
        // Initially, the sign-in panel should be visible
        cy.get('.container').should('not.have.class', 'right-panel-active');
      
        // Click the sign-up button
        cy.get('#signUp').click();
      
        // Wait for a short period to allow the UI to update
        cy.wait(1000); 
      
        cy.get('.container').should('have.class', 'right-panel-active');
      });
      
  });
  