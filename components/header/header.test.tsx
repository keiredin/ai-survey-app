// components/header/header.test.tsx
import { render, screen } from "@testing-library/react";
import Header from "./header";

// Mock the Menu component
// eslint-disable-next-line react/display-name
jest.mock("./menu", () => () => <div data-testid="mock-menu">Mock Menu</div>);

describe("Header Component", () => {
  it("renders with logo, text, and menu", () => {
    // Act: Render the component
    render(<Header />);

    // Assert
    // Check the header element
    const headerElement = screen.getByRole("banner"); // <header> has role="banner"
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass("border-b");

    // Check the logo image
    const logoImage = screen.getByAltText("AI Survey App logo");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute(
      "src",
      "/_next/image?url=%2Fimages%2Fsurvey-icon.png&w=96&q=75"
    );
    expect(logoImage).toHaveAttribute("width", "48");
    expect(logoImage).toHaveAttribute("height", "48");

    // Check the app name (hidden on small screens, so use getByText with caution)
    const appName = screen.getByText("AI Survey App");
    expect(appName).toBeInTheDocument();
    expect(appName).toHaveClass("hidden", { exact: false }); // Part of "hidden lg:block"

    // Check the link to "/"
    const homeLink = screen.getByRole("link", { name: /AI Survey App/i });
    expect(homeLink).toHaveAttribute("href", "/");

    // Check the mocked Menu
    const menu = screen.getByTestId("mock-menu");
    expect(menu).toBeInTheDocument();
    expect(menu).toHaveTextContent("Mock Menu");
  });
});
