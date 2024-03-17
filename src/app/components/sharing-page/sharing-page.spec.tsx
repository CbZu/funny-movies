import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import fetchMock from "fetch-mock";
import Cookies from "js-cookie";
import { API_DOMAIN } from "src/app/constants";
import '@testing-library/jest-dom';
import { toast } from "react-toastify";
import SharingPage from "./sharing-page";

describe('SharingPage Component', () => {

  beforeEach(() => {
    fetchMock.reset();
    Cookies.set('token', 'token-value');
    vi.clearAllMocks();
  });

  afterEach(() => {
    fetchMock.restore();
  });
  
  test('shares video successfully', async () => {
    const mockToastSuccess = vi.fn();
    toast.success = mockToastSuccess;

    render(<SharingPage />);

    fetchMock.post(`${API_DOMAIN}/videos-sharing`, { success: true });

    const urlInput = screen.getByLabelText('Youtube URL:');
    fireEvent.change(urlInput, { target: { value: 'https://www.youtube.com/watch?v=example' } });

    const shareButton = screen.getByRole('button', { name: 'Share' });
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(mockToastSuccess).toHaveBeenCalledWith('Shared successfully');
    });
  });

  test('shares video failed', async () => {
    const mockToastFailed = vi.fn();
    toast.error = mockToastFailed;

    render(<SharingPage />);

    fetchMock.post(`${API_DOMAIN}/videos-sharing`, { status: 422 });

    const urlInput = screen.getByLabelText('Youtube URL:');
    fireEvent.change(urlInput, { target: { value: 'https://www.youtube.com/watch?v=example' } });

    const shareButton = screen.getByRole('button', { name: 'Share' });
    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(mockToastFailed).toHaveBeenCalledWith('Can not share video');
    });
  });
});