import { screen, fireEvent } from '@testing-library/react';
import SignUp from './SignUp';
import { renderWithProviders } from '../../utils/test_utils';

test('renders Email input', () => {
  renderWithProviders(<SignUp />);
  const emailInput = screen.getByLabelText(/Email Address:/i);
  expect(emailInput).toBeInTheDocument();
})

test('renders Password input', () => {
  renderWithProviders(<SignUp />);
  const passwordInput = screen.getByLabelText(/Password:/i);
  expect(passwordInput).toBeInTheDocument();
})

test('renders First Name input', () => {
  renderWithProviders(<SignUp />);
  const firstNameInput = screen.getByLabelText(/First Name:/i);
  expect(firstNameInput).toBeInTheDocument();
})

test('renders Last Name input', () => {
  renderWithProviders(<SignUp />);
  const lastNameInput = screen.getByLabelText(/Last Name:/i);
  expect(lastNameInput).toBeInTheDocument();
})

test('Flags invalid email', () => {
  renderWithProviders(<SignUp />);
  const emailInput = screen.getByLabelText(/Email Address:/i);
  fireEvent.change(emailInput, { target: { value: 'invalid email' } });
  const emailError = screen.getByText(/Invalid email address/i);
  expect(emailError).toBeInTheDocument();
})
