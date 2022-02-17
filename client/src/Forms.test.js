import { render, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Balance from "./views/Balance";
import Buy from "./views/Buy";
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { wait } from "@testing-library/user-event/dist/utils";

const buyPageSetup = () => {
  const utils = render(<Buy />);
  const meterInput = screen.getByPlaceholderText("Meter number");
  const amountInput = screen.getByPlaceholderText(/Amount/i);
  return {
    meterInput,
    amountInput,
    ...utils,
  };
};

const balancePageSetup = () => {
  const utils = render(<Balance />);
  const meterInput = screen.getByPlaceholderText("Meter number");

  return {
    meterInput,
    ...utils,
  };
};

test("It should show an error below amount input", async () => {
  const { amountInput } = buyPageSetup();
  userEvent.type(amountInput, "3");
  const spy = jest.fn();

  expect(amountInput).toHaveAttribute("type", "number");

  await waitFor(() => {
    expect(
      screen.getByText("Amount must be a multiple of 100 and less than 182,500")
    ).toBeInTheDocument();
  });

  // expect(
  //   screen.getByText("Amount must be a multiple of 100 and less than 182,500")
  // ).toBeInTheDocument();
});

test("It should show an error below meter number input", async () => {
  const { meterInput } = buyPageSetup();

  userEvent.type(meterInput, "123456");
  fireEvent.change(meterInput, { target: { value: "123456" } });

  expect(meterInput).toHaveAttribute("type", "number");

  await waitFor(() => {
    expect(
      screen.getByText("Invalid meter, only 6 digits accepted")
    ).toBeInTheDocument();
  });
});

test("It should show an error below meter number input on balance page", async () => {
  const { meterInput } = balancePageSetup();
  userEvent.type(meterInput, "123456");

  expect(meterInput).toHaveAttribute("type", "number");

  await waitFor(() => {
    expect(screen.getByText("Your meter is invalid")).toBeInTheDocument();
  });
});
