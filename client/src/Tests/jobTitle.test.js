import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import JobTitle from '../components/Matching/JobTitle';

describe('JobTitle component', () => {
  test('updates job title when input changes', () => {
    const handleJobTitleChange = jest.fn();
    render(
      <JobTitle jobTitle="" handleJobTitleChange={handleJobTitleChange} />,
    );

    const inputField = screen.getByRole('textbox', {
      name: 'Enter your most recent Job Title',
    });

    fireEvent.change(inputField, {
      target: {value: 'Product Manager'},
    });

    expect(handleJobTitleChange).toHaveBeenCalledTimes(1);
  });
});
