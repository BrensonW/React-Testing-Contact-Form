import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import ContactForm from './components/ContactForm';
import { act } from "react-dom/test-utils";

test("renders App without crashing", () => {
  render(<App />);
});

describe("On Submit works" , () => {
  it('calls onSubmit function', async () => {
    const mockOnSubmit = jest.fn()
    const { getByTestId, getByRole } = render(<ContactForm onSubmit = {mockOnSubmit} />)
    const emailInput = getByTestId("email")
    const firstNameInput = getByTestId("Edd")
    const lastNameInput = getByTestId("Burke")
    await act(async () => {
    fireEvent.change(emailInput, {target:{value:'email@123.com'}})
    fireEvent.change(firstNameInput, {target:{value:"Daniel"}})
    fireEvent.change(lastNameInput , {target: {value:"Terry"}})
  })
  await act(async () => {
      fireEvent.click(getByTestId("submit"))
  })
  expect(mockOnSubmit).toHaveBeenCalled
  })

})

test('Have firstName' , () => {
  const { getByTestId } = render(<ContactForm />)
  const firstNameInput = getByTestId("Edd")
  fireEvent.change(firstNameInput, {target:{value:"Daniel"}})
  expect(firstNameInput).toHaveValue("Daniel")
})

test('Have Last Name ',  () => {
  const { getByTestId } = render(<ContactForm />)
  const lastNameInput = getByTestId("Burke")
  fireEvent.change(lastNameInput , {target: {value:"Terry"}})
  expect(lastNameInput).toHaveValue("Terry")
})
test('Have Valid Email' , () => {
  const { getByTestId } = render(<ContactForm />)
  const emailInput = getByTestId("email")
  fireEvent.change(emailInput, {target:{value:'email@123.com'}})
  expect(emailInput).toHaveValue('email@123.com')
})

