import { render, screen } from '@testing-library/react';
import Video from "./video";
import '@testing-library/jest-dom';

describe('Video Component', () => {
  const videoData = {
    id: 4,
    sharedBy: 'John Doe',
    url: 'https://www.example.com/video.mp4',
    title: 'Example Video',
    description: 'This is an example video description.',
  };

  test('renders video with correct data', () => {
    render(<Video {...videoData} />);

    const titleElement = screen.getByText(videoData.title);
    expect(titleElement).toBeInTheDocument();

    const sharedByElement = screen.getByText(`Shared by: ${videoData.sharedBy}`);
    expect(sharedByElement).toBeInTheDocument();

    const descriptionElement = screen.getByText(videoData.description);
    expect(descriptionElement).toBeInTheDocument();

    const youtubeElement = screen.getByTestId('video');
    expect(youtubeElement).toBeInTheDocument();
  });
});