import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import CareerSelection from './CareerSelection';

describe('CareerSelection', () => {
  const selectedInterest = 'Front End Development';

  beforeEach(() => {
    render(<CareerSelection selectedInterest={selectedInterest} />);
  });

  it('renders the dropdown', () => {
    const headerText = screen.getByText('Select your career interests:');
    expect(headerText).toBeInTheDocument();
  });
});
