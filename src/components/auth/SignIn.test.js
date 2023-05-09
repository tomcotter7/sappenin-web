import { screen, fireEvent } from '@testing-library/react';
import SignIn from './SignIn';
import { renderWithProviders } from '../../utils/test_utils';

test('renders email field', () => {
  renderWithProviders(<SignIn />);
  const emailElement = screen.getByText(/Email Address:/i);
  expect(emailElement).toBeInTheDocument();
})

test('renders password field', () => {
  renderWithProviders(<SignIn />);
  const passwordElement = screen.getByText(/Password:/i);
  expect(passwordElement).toBeInTheDocument();
})

test('renders submit button', () => {
  renderWithProviders(<SignIn />);
  const submitElement = screen.getByText(/Submit/i);
  expect(submitElement).toBeInTheDocument();
})

test('email allows user to type', () => {
  renderWithProviders(<SignIn />);
  const emailForm = screen.getByLabelText(/Email Address:/i);
  fireEvent.change(emailForm, {target: {value: "test@test.com"}})
  expect(emailForm.value).toBe("test@test.com")
})

test('password allows user to type', () => {
  renderWithProviders(<SignIn />);
  const passwordForm = screen.getByLabelText(/Password:/i);
  fireEvent.change(passwordForm, {target: {value: "password"}})
  expect(passwordForm.value).toBe("password")
})

test('Auth error causes new div', () => {
  const initState = {auth : {authError: true}, deal : {}, business : {},
                     notifications : {}, firestore : {},
                     firebase : {}, location : {}}
  renderWithProviders(<SignIn />, {preloadedState: initState});
  const authErrorElement = screen.getByText(/Please check your email and password./i);
  expect(authErrorElement).toBeInTheDocument();
})
