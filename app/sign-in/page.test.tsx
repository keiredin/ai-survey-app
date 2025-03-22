// app/sign-in/page.test.tsx
import { render, screen } from "@testing-library/react";
import SignIn from "./page";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

// Mock dependencies
jest.mock("@/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

// eslint-disable-next-line react/display-name
jest.mock("./credentials-signin-form", () => () => (
  <div data-testid="mock-credentials-form">Mock Credentials Form</div>
));

describe("SignIn Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to callbackUrl when user is authenticated", async () => {
    // Arrange
    (auth as jest.Mock).mockResolvedValue({
      user: { id: "user123", name: "John", email: "john@example.com" },
    });
    const searchParams = { callbackUrl: "/dashboard" };

    // Act
    await SignIn({ searchParams: Promise.resolve(searchParams) });

    // Assert
    expect(auth).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith("/dashboard");
    expect(redirect).not.toHaveBeenCalledWith("/");
  });

  it("redirects to home when user is authenticated and no callbackUrl", async () => {
    // Arrange
    (auth as jest.Mock).mockResolvedValue({
      user: { id: "user123", name: "John", email: "john@example.com" },
    });
    const searchParams = { callbackUrl: "" };

    // Act
    await SignIn({ searchParams: Promise.resolve(searchParams) });

    // Assert
    expect(auth).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith("/");
  });

  it("renders sign-in card when user is not authenticated", async () => {
    // Arrange
    (auth as jest.Mock).mockResolvedValue(null);
    const searchParams = { callbackUrl: "/dashboard" };

    // Act: Resolve the async component first
    const signInResult = await SignIn({
      searchParams: Promise.resolve(searchParams),
    });

    // Render the JSX result
    const { container } = render(signInResult as React.ReactElement);

    // Assert
    expect(auth).toHaveBeenCalled();

    // Check card structure
    const card = container.querySelector(".max-w-md");
    expect(card).toBeInTheDocument();

    // Check logo
    const logoImage = screen.getByAltText("survey app logo");
    expect(logoImage).toBeInTheDocument();

    expect(logoImage.getAttribute("src")).toMatch(
      /^\/_next\/image\?url=%2Fimages%2Fsurvey-icon\.png&w=\d+&q=\d+$/
    );
    expect(logoImage).toHaveAttribute("width", "100");
    expect(logoImage).toHaveAttribute("height", "100");

    // Check link to home
    const homeLink = screen.getByRole("link", { name: /survey app logo/i });
    expect(homeLink).toHaveAttribute("href", "/");

    // Check title and description
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(
      screen.getByText("Select a method to sign in to your account")
    ).toBeInTheDocument();

    // Check mocked CredentialsSignInForm
    const form = screen.getByTestId("mock-credentials-form");
    expect(form).toBeInTheDocument();
    expect(form).toHaveTextContent("Mock Credentials Form");
  });
});
