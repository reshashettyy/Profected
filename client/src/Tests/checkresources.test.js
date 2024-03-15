import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Landing from '../components/Landing/Landing';

test('clicking on "Explore Resources" and "Get Matched" button triggers action', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Landing />
    </BrowserRouter>
  );

    const exploreResourcesButton = getByText('Explore Resources');
    fireEvent.click(exploreResourcesButton);

    const getMatchedButton = getByText('Get Matched');
    fireEvent.click(getMatchedButton);
});
