jest.mock('../components/Firebase', () => ({
    withFirebase: Component => props => <Component {...props} />
  }));

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Auth from '../components/auth/Test/Auth'; 
import '@testing-library/jest-dom';

describe('Auth Page', () => {
    test('renders the signup button', () => {
      render(
        <MemoryRouter initialEntries={['/auth']}>
          <Auth />
        </MemoryRouter>
      );
  
      const signUpButton = screen.getByText('Sign Up');
      expect(signUpButton).toBeInTheDocument();
    });
  });