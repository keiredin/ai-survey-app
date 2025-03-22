import { render, screen, fireEvent } from "@testing-library/react";
import SignUpForm from "./signup-form";
import { signUp } from "@/lib/actions/user.actions";

jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams("callbackUrl=/dashboard"),
}));

jest.mock("@/lib/actions/user.actions", () => ({
  signUp: jest.fn().mockResolvedValue({ message: "", success: false }),
}));

describe("SignUpForm", () => {
  it("renders form and submits", () => {
    render(<SignUpForm />);

    // Check inputs
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();

    // Check button
    const signUpButton = screen.getByRole("button", { name: "Sign Up" });
    expect(signUpButton).toBeInTheDocument();

    // Submit form
    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(signUp).toHaveBeenCalled();
  });
});
