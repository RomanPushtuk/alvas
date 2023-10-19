import { render, screen } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
  test("render input", () => {
    render(<Input />);

    expect(true).toBe(true);
  });
});
