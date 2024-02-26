import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUp from '../components/SignUp/SignUp'

// Mock console.log
console.log = jest.fn();

test('passwords match in sign up form', () => {
  const { getByLabelText, getByText } = render(<SignUp />);

  // Simulate user input
  fireEvent.change(getByLabelText('Password:'), { target: { value: 'password123' } });
  fireEvent.change(getByLabelText('Confirm Password:'), { target: { value: 'password123' } });

  // Submit the form
  fireEvent.click(getByText('Sign Up'));

  // Check if the passwords match
  expect(console.log).toHaveBeenCalledWith(expect.objectContaining({
    password: 'password123',
    confirmPassword: 'password123',
  }));
});
