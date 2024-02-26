import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import ProgramSelection from '../components/Matching/ProgramSelection';

describe('ProgramSelection', () => {
  const selectedProgram = 'Engineering';

  beforeEach(() => {
    render(<ProgramSelection selectedProgram={selectedProgram} />);
  });

  it('renders the dropdown', () => {
    const headerText = screen.getByText('Select your Program:');
    expect(headerText).toBeInTheDocument();
  });
});
