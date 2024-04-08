import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import GraduationYearSelection from '../components/Matching/GraduationYearSelection';

describe('GraduationYearSelection', () => {
  const handleYearChange = jest.fn();
  const selectedYear = new Date().getFullYear();

  beforeEach(() => {
    render(
      <GraduationYearSelection
        selectedYear={selectedYear}
        handleYearChange={handleYearChange}
      />,
    );
  });

  it('renders the header', () => {
    const headerElements = screen.getAllByText(/Select your Graduation Year:/i);
    const header = headerElements.find(
      element => element.tagName.toLowerCase() === 'h3',
    );
    expect(header).toBeInTheDocument();
  });

  it('renders the dropdown with the correct current year selected', () => {
    const selectElement = screen.getByDisplayValue(selectedYear.toString());
    expect(selectElement).toBeInTheDocument();
  });
});
