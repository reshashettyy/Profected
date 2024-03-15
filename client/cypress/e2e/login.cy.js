describe('Login', () => {
  it('logs in with predefined authenticated credentials', () => {
    cy.visit('http://localhost:3000/login');

    const authenticatedCredentials = {
      user1: {
        email: 'testuser@gmail.com',
        password: 'test123',
      },
    };

    const {email, password} = authenticatedCredentials.user1;

    // Fill in the email and password fields with the chosen values
    cy.get('#email').type(email);
    cy.get('#password').type(password);

    // Click the login button
    cy.get('button[type="submit"]').click();

    // Check if the navigation to the home page occurs after successful login
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
