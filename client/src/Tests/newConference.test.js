import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Resources from '../components/Resources';

describe('2nd Event', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        {
          conference_id: 2,
          conference_name: 'Women in Tech Toronto - OutGeekWomen',
          conference_location: 'Startup HQ',
          conference_time: new Date().toISOString(),
          latitude: 47.86719,
          longitude: -121.74357,
        },
      ]),
      status: 200,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the second conference card', async () => {
    render(<Resources />);
    await screen.findByText('Women in Tech Toronto - OutGeekWomen');
    expect(
      screen.getByText('Women in Tech Toronto - OutGeekWomen'),
    ).toBeInTheDocument();
  });
});
