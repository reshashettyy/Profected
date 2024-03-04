import React from 'react';
import {render, screen} from '@testing-library/react';
import MainCalendar from './Calendar';

test('calendar is rendered with the different text fields for users to submit their event', () => {
  render(<MainCalendar />);

  const calendarTitle = screen.getByText('Calendar');
  expect(calendarTitle).toBeInTheDocument();

  const addNewEventTitle = screen.getByText('Add New Event');
  expect(addNewEventTitle).toBeInTheDocument();

  const addTitle = screen.getByPlaceholderText('Add Title');
  expect(addTitle).toBeInTheDocument();

  const startDate = screen.getByPlaceholderText('Start Date');
  expect(startDate).toBeInTheDocument();

  const endDate = screen.getByPlaceholderText('End Date');
  expect(endDate).toBeInTheDocument();
});
