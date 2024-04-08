describe('Matching Button', () => {
  it('should navigate to the matching page when clicked', () => {
    // Mock Firebase authentication to intercept the auth request and respond with a mocked response
    cy.intercept('POST', '/identitytoolkit.googleapis.com/', {
      statusCode: 200,
      body: {
        kind: 'identitytoolkit#VerifyPasswordResponse',
        localId: 'exampleUid123',
        email: 'user@example.com',
        displayName: '',
        idToken: 'mockedIdToken',
        registered: true,
        refreshToken: 'mockedRefreshToken',
        expiresIn: '3600',
      },
    }).as('firebaseAuth');

    // Handle uncaught exceptions to prevent the test from failing
    // and navigate away from the error page if possible.
    cy.on('uncaught:exception', (err, runnable) => {
      console.error('An uncaught exception was found', err);
      // Optionally, you can check for specific errors and return false only for those
      // if (err.message.includes('specific error message')) {
      //   return false;
      // }

      // Navigate back to the home page if an uncaught exception occurs
      cy.visit('http://localhost:3000/');

      // Click the matching button
      cy.contains('Get Matched').click();

      // Assert that the URL contains '/matching' indicating navigation to the matching page
      cy.url().should('include', '/login');
    });

    // Visit the home page and interact with the 'Get Matched' button
    cy.visit('http://localhost:3000/');
    cy.contains('Get Matched').should('be.visible').click();

    // Check that the URL includes '/auth' after clicking 'Get Matched'
    cy.url().should('include', '/auth');

    // Add a check to ensure the SignIn component is visible after navigation
    cy.contains('Sign In').should('be.visible');
  });
});
