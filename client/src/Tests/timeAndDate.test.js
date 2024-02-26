import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import TimeDate from '../components/Matching/TimeDate';

describe('TimeDate', () => {
  it('renders the calendar and time selection headers', () => {
    render(<TimeDate />);
    const datesHeader = screen.getByText('Select the dates that work for you:');
    const timesHeader = screen.getByText('Select the times that work for you:');

    expect(datesHeader).toBeInTheDocument();
    expect(timesHeader).toBeInTheDocument();
  });
});
