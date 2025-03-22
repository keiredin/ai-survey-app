// components/Footer.test.tsx
import { render, screen } from "@testing-library/react";
import Footer from "@/components/footer";

describe("Footer Component", () => {
  it("renders with the current year and static text", () => {
    // Arrange: Mock the current date to a fixed value for consistency
    const fixedDate = new Date("2025-03-22T00:00:00Z");
    jest.spyOn(global, "Date").mockImplementation(() => fixedDate);

    // Act: Render the component
    render(<Footer />);

    // Assert: Check the rendered output
    const currentYear = fixedDate.getFullYear().toString(); // "2025"
    const footerText = `${currentYear} AI Survey App. All Rights reserved.`;

    expect(screen.getByText(footerText)).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toHaveClass("border-t"); // Checks <footer> class
  });

  it("renders without crashing", () => {
    // Act: Render the component
    const { container } = render(<Footer />);

    // Assert: Check that it renders something
    expect(container).toBeTruthy();
    expect(container.querySelector("footer")).toBeInTheDocument();
  });
});
