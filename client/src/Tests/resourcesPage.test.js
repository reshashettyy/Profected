import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Resources from '../components/Resources';

describe('Resources', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        {
          conference_id: 1,
          conference_name: 'Tech Networking Social @ Offworld Bar',
          conference_location: '730 Queen St W',
          conference_time: new Date().toISOString(),
          latitude: 43.64636,
          longitude: -79.40949,
        },
      ]),
      status: 200,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders a conference cards', async () => {
    render(<Resources />);
    await screen.findByText('Tech Networking Social @ Offworld Bar');
    expect(
      screen.getByText('Tech Networking Social @ Offworld Bar'),
    ).toBeInTheDocument();
  });
});
