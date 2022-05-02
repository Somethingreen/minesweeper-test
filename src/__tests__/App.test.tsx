import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from '../App';

it('Renders start menu', () => {
  const { getByText, getByRole, getAllByRole, asFragment } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(asFragment).toMatchSnapshot();

  expect(getByText(/Minesweeper/i)).toBeInTheDocument();
  expect(getAllByRole("radio").length).toEqual(4);
  const startMenuButton = getByRole("button", { name: /Start/i });
  expect(startMenuButton).toBeInTheDocument();
});
