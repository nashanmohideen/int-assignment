import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Text from "@/components/text";

describe("Text Component", () => {
  it("should render the component with the correct text", () => {
    render(<Text text="Sample Text" />);

    // CheckS that the text prop is rendered correctly
    const textElement = screen.getByText("Sample Text");
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass("text-black");
  });

  it("should render children when provided", () => {
    render(
      <Text text="Sample Text">
        <div>Child Content</div>
      </Text>
    );

    // CheckS that children are rendered correctly
    const childElement = screen.getByText("Child Content");
    expect(childElement).toBeInTheDocument();

    // CheckS that the parent div of the children has the correct styles
    const parentElement = childElement.parentElement;
    expect(parentElement).toHaveClass("text-black");
  });

  it("should apply the correct styles based on Tailwind classes", () => {
    render(<Text text="Sample Text" />);

    // Check styles applied to the outer div
    const outerDiv = screen.getByText("Sample Text").parentElement;
    expect(outerDiv).toHaveClass("w-full");
    expect(outerDiv).toHaveClass("bg-green-200");
    expect(outerDiv).toHaveClass("p-4");
    expect(outerDiv).toHaveClass("text-white");
    expect(outerDiv).toHaveClass("lg:w-[550px]");
    expect(outerDiv).toHaveClass("sm:p-3");

    // Check styles applied to the inner div
    const innerDiv = outerDiv?.firstChild as HTMLElement;
    expect(innerDiv).toHaveClass("w-full");
    expect(innerDiv).toHaveClass("mb-2");
    expect(innerDiv).toHaveClass("flex");
    expect(innerDiv).toHaveClass("justify-center");
    expect(innerDiv).toHaveClass("items-center");
    expect(innerDiv).toHaveClass("text-black");
  });
});
