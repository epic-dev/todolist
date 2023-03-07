import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { LoginFormView } from './modules/Authentication';

test('Login form has Sign In button', () => {
  const store = configureStore({
    reducer: {
      auth: () => ({
        isAuthenticated: true,
      })
    }
  });

  render(<Provider store={store}><MemoryRouter><LoginFormView /></MemoryRouter></Provider>)

  const linkElement = screen.getByText(/Sign In/i);
  expect(linkElement).toBeInTheDocument();
});
