import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Header from './header';
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import fetchMock from 'fetch-mock';
import { API_DOMAIN } from "src/app/constants";
import Cookies from 'js-cookie';

describe('Header', () => {

  beforeEach(() => {
    fetchMock.reset();
    Cookies.remove('token');
    Cookies.remove('email');
  });

  afterEach(() => {
    fetchMock.restore();
  });

  test('renders correctly when not logged in', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );
    
    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login \/ Register/ })).toBeInTheDocument();
  });

  test('logs in successfully', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    const mockResponse = { token: 'mocked_token', email: 'test@example.com' };
    fetchMock.post(`${API_DOMAIN}/login`, mockResponse);

    fireEvent.change(screen.getByPlaceholderText('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Login \/ Register/ }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Logout/ })).toBeInTheDocument();
    });
  });

  test('logs out successfully', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );
    expect(screen.queryByRole('button', { name: /Logout/ })).not.toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Login \/ Register/ }));
    await waitFor(() => expect(screen.getByRole('button', { name: /Logout/ })).toBeInTheDocument());

    fireEvent.click(screen.getByRole('button', { name: /Logout/ }));

    expect(screen.getByPlaceholderText('email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login \/ Register/ })).toBeInTheDocument();
  });
  
});
