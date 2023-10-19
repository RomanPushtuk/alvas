import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";
import loginAction from "@/actions/LoginAction";

jest.mock("../../actions/LoginAction", () => {
  return jest.fn().mockImplementation(() => {
    return { push: jest.fn() };
  });
});

describe("Login Form", () => {
  test("have to render elements", () => {
    render(<Form />);

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const errorInfo = screen.queryByTestId("error-info");
    const submitButton = screen.getByTestId("submit-button");

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(errorInfo).not.toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("have to be error info about empty fields", () => {
    render(<Form />);

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const errorInfo = screen.queryByTestId("error-info");
    const submitButton = screen.getByTestId("submit-button");

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(errorInfo).not.toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(usernameInput, { target: { value: "1" } });
    fireEvent.change(usernameInput, { target: { value: "" } });

    expect(screen.getByTestId("error-info")).toBeInTheDocument();

    expect(screen.getByTestId("error-info")).toHaveTextContent(
      "username and password fields shouldn't be empty"
    );
  });

  test("to be empty click unhandeled", () => {
    render(<Form />);

    const submitButton = screen.getByTestId("submit-button");
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);
    expect(loginAction).not.toBeCalled();
  });

  test("to be click unhandeled when two field full", () => {
    render(<Form />);

    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByTestId("submit-button");

    fireEvent.change(usernameInput, { target: { value: "1" } });
    fireEvent.change(passwordInput, { target: { value: "1" } });
    fireEvent.click(submitButton);
    expect(loginAction).toBeCalled();
  });
});
