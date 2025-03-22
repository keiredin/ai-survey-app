import { render, screen, fireEvent } from "@testing-library/react";
import CredentialsSignInForm from "./credentials-signin-form";
import { signInWithCredentials } from "@/lib/actions/user.actions";

jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams("callbackUrl=/dashboard"),
}));

jest.mock("@/lib/actions/user.actions", () => ({
  signInWithCredentials: jest.fn(),
}));

describe("CredentialsSignInForm", () => {
  it("renders form and submits", () => {
    const { container } = render(<CredentialsSignInForm />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    const signInButton = screen.getByRole("button", {
      name: "Sign In with credentials",
    });
    expect(signInButton).toBeInTheDocument();

    // Submit the form directly
    const form = container.querySelector("form");
    if (!form) throw new Error("Form not found in render");
    fireEvent.submit(form);

    expect(signInWithCredentials).toHaveBeenCalled();
  });
});
