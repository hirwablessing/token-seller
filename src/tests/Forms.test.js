import { render, screen } from "@testing-library/react";
import Buy from "../views/Buy";

const setup = () => {
  const utils = render(<Buy />);
  const meterInput = utils.getByPlaceholderText("Meter number");
  const amountInput = utils.getByPlaceholderText(/Amount/i);
  return {
    meterInput,
    amountInput,
    ...utils,
  };
};

test("It should show an error below amount input", () => {
  const { meterInput } = setup();
  fireEvent.change(input, { target: { value: "234" } });
  expect(
    screen.getByText("Amount must be a multiple of 100 and less than 182,500")
  ).toBeInTheDocument();
});

test("It should show an error below meter number input", () => {
  const { meterInput } = setup();
  fireEvent.change(input, { target: { value: "123" } });
  expect(
    screen.getByText("Invalid meter, only 6 digits accepted")
  ).toBeInTheDocument();
});
