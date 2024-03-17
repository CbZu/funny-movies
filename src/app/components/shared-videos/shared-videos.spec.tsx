import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { VideoModel } from 'src/app/model/Video';
import SharedVideos from "./shared-videos";
import '@testing-library/jest-dom';
import fetchMock from "fetch-mock";
import { API_DOMAIN } from "src/app/constants";

describe('SharedVideos Component', () => {

  beforeEach(() => {
    fetchMock.reset();
    vi.clearAllMocks();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  test('renders loading state when videos are loading', () => {
    const setLoading = vi.fn();
    vi.spyOn(React, 'useState').mockReturnValueOnce([[], setLoading]);
    vi.spyOn(React, 'useEffect').mockImplementationOnce((callback) => callback());

    render(<SharedVideos />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders videos when loaded', async () => {
    const mockVideos: VideoModel[] = [
      {
        id: 1,
        sharedBy: 'user1',
        url: 'video_url_1',
        title: 'Video title',
        description: 'Description 1',
      },
      {
        id: 2,
        sharedBy: 'user2',
        url: 'video_url_2',
        title: 'Video title',
        description: 'Description 2',
      },
    ];
    fetchMock.get(`${API_DOMAIN}/videos-sharing`, mockVideos);

    render(<SharedVideos />);

    await waitFor(() => {
      expect(screen.getAllByText('Video title')).toHaveLength(mockVideos.length);
    });
  });
});