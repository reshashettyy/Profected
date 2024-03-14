describe('Login', () => {
  it('logs in with hardcoded credentials', () => {
    cy.visit('http://localhost:3000/login');

    //fill in the username and password fields with hardcoded values
    cy.get('#username').type('testuser');
    cy.get('#password').type('testpassword');

    //click the login button
    cy.get('button[type="submit"]').click();

    //alert button should show up
    cy.on('window:alert', alertText => {
      expect(alertText).to.equal('Login successful!');
    });
  });
});
