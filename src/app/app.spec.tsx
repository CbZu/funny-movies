import { render, screen } from '@testing-library/react';

import App from './app';
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';

describe('App', () => {
  test('renders SharedVideos component when "/" route is active', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
  
    const sharedVideosElement = screen.getByTestId('shared-videos');
    expect(sharedVideosElement).toBeInTheDocument();
  });
  
  test('renders SharingPage component when "/share" route is active', () => {
    render(
      <MemoryRouter initialEntries={['/share']}>
        <App />
      </MemoryRouter>
    );
  
    const sharingPageElement = screen.getByTestId('sharing-page');
    expect(sharingPageElement).toBeInTheDocument();
  });
});
