import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "@/components/footer";

describe("Footer Component", () => {
  it("Should be render the footer with the correct text", () => {
    render(<Footer />);

    const footerElement = screen.getByRole("contentinfo");
    const footeringElement = screen.getByText("Footer");

    expect(footerElement).toBeInTheDocument();
    expect(footerElement).toHaveClass(
      "bg-blue-700",
      "w-full",
      "h-24",
      "text-white",
      "flex",
      "justify-center",
      "items-center"
    );
    expect(footeringElement).toBeInTheDocument();
  });
});
