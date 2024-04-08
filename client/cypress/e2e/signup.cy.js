Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  if (err.message.includes('auth/internal-error')) {
    return false;
  }
});

describe('Sign up slide test', () => {
  beforeEach(() => {
    // Mock Firebase Auth calls
    cy.intercept(
      'POST',
      '**/identitytoolkit.googleapis.com/v1/accounts:lookup**',
      {
        statusCode: 200,
        body: {
          users: [{id: 'hbGSLahgK9O0iS4MKBeeNkWrBh63', email: 'ds@gmail.com'}],
        },
      },
    );

    // Mock Firestore calls
    cy.intercept(
      'POST',
      '**/firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel**',
      {
        statusCode: 200,
        body: {},
      },
    );

    // Mock Firestore REST API calls if needed
    cy.intercept(
      'GET',
      '**/firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel**',
      {
        statusCode: 200,
        body: {},
      },
    );

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
