import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import CareerSelection from '../components/Matching/CareerSelection';

describe('CareerSelection', () => {
  const selectedInterest = 'Front End Development';

  beforeEach(() => {
    render(<CareerSelection selectedInterest={selectedInterest} />);
  });

  it('renders the dropdown', () => {
    const headerText = screen.getByText('Select your Career Interests:');
    expect(headerText).toBeInTheDocument();
  });
});
