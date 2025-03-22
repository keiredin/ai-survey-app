// app/sign-up/page.test.tsx
import { render, screen } from "@testing-library/react";
import SignUp from "./page";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

// Mock dependencies
jest.mock("@/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

// Ensure no spaces or typos in data-testid
// eslint-disable-next-line react/display-name
jest.mock("./signup-form", () => () => (
  <div data-testid="mock-signup-form">Mock SignUp Form</div>
));

describe("SignUp Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("redirects to callbackUrl when user is authenticated", async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: "user123", name: "John", email: "john@example.com" },
    });
    const searchParams = { callbackUrl: "/dashboard" };

    await SignUp({ searchParams: Promise.resolve(searchParams) });

    expect(auth).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith("/dashboard");
    expect(redirect).not.toHaveBeenCalledWith("/");
  });

  it("redirects to home when user is authenticated and no callbackUrl", async () => {
    (auth as jest.Mock).mockResolvedValue({
      user: { id: "user123", name: "John", email: "john@example.com" },
    });
    const searchParams = { callbackUrl: "" };

    await SignUp({ searchParams: Promise.resolve(searchParams) });

    expect(auth).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith("/");
  });

  it("renders sign-up card when user is not authenticated", async () => {
    (auth as jest.Mock).mockResolvedValue(null);
    const searchParams = { callbackUrl: "/dashboard" };

    const signUpResult = await SignUp({
      searchParams: Promise.resolve(searchParams),
    });

    const { container } = render(signUpResult as React.ReactElement);

    expect(auth).toHaveBeenCalled();

    const card = container.querySelector(".max-w-md");
    expect(card).toBeInTheDocument();

    const logoImage = screen.getByAltText("Survey App logo");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage.getAttribute("src")).toMatch(
      /^\/_next\/image\?url=%2Fimages%2Fsurvey-icon\.png&w=\d+&q=\d+$/
    );
    expect(logoImage).toHaveAttribute("width", "100");
    expect(logoImage).toHaveAttribute("height", "100");

    const homeLink = screen.getByRole("link", { name: /Survey App logo/i });
    expect(homeLink).toHaveAttribute("href", "/");

    expect(screen.getByText("Create Account")).toBeInTheDocument();
    expect(
      screen.getByText("Enter your information below to create your account")
    ).toBeInTheDocument();

    const form = screen.getByTestId("mock-signup-form");
    expect(form).toBeInTheDocument();
    expect(form).toHaveTextContent("Mock SignUp Form");
  });
});
