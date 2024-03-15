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
    const headerTextElements = screen.queryAllByText('Select your Program:');

    headerTextElements.forEach(element => {
      expect(element).toBeInTheDocument();
    });
  });
});
