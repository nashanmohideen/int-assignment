import { render, screen, fireEvent } from "./test-utils";
import Carousel from "@/components/carousel";

const getImageSrc = (url: string) => {
  const imgElement = screen.getByRole("img") as HTMLImageElement;
  return imgElement ? imgElement.src.includes(url) : false;
};

test("should render the carousel with the correct image", () => {
  const slides = [
    { posterUrl: "http://example.com/image1.jpg", id: "1", count: 1 },
    { posterUrl: "http://example.com/image2.jpg", id: "2", count: 1 },
  ];

  render(<Carousel slides={slides} />);

  expect(getImageSrc("http://example.com/image1.jpg")).toBe(true);
});

test("should navigate to the next slide", () => {
  const slides = [
    { posterUrl: "http://example.com/image1.jpg", id: "1", count: 1 },
    { posterUrl: "http://example.com/image2.jpg", id: "2", count: 1 },
  ];

  render(<Carousel slides={slides} />);

  fireEvent.click(screen.getByLabelText("Next slide"));
  expect(getImageSrc("http://example.com/image2.jpg")).toBe(true);
});

test("should navigate to the previous slide", () => {
  const slides = [
    { posterUrl: "http://example.com/image1.jpg", id: "1", count: 1 },
    { posterUrl: "http://example.com/image2.jpg", id: "2", count: 1 },
  ];

  render(<Carousel slides={slides} />);

  fireEvent.click(screen.getByLabelText("Next slide"));
  fireEvent.click(screen.getByLabelText("Previous slide"));
  expect(getImageSrc("http://example.com/image1.jpg")).toBe(true);
});

test("should render a message when there are no images", () => {
  render(<Carousel slides={[]} />);

  expect(screen.getByText("No images to display")).toBeInTheDocument();
});

test("should navigate to the next slide", () => {
  const slides = [
    { posterUrl: "http://example.com/image1.jpg", id: "1", count: 1 },
    { posterUrl: "http://example.com/image2.jpg", id: "2", count: 1 },
  ];

  render(<Carousel slides={slides} />);

  fireEvent.click(screen.getByLabelText("Next slide"));
  expect(getImageSrc("http://example.com/image2.jpg")).toBe(true);
});

test("should navigate to the previous slide", () => {
  const slides = [
    { posterUrl: "http://example.com/image1.jpg", id: "1", count: 1 },
    { posterUrl: "http://example.com/image2.jpg", id: "2", count: 1 },
  ];

  render(<Carousel slides={slides} />);

  fireEvent.click(screen.getByLabelText("Next slide"));
  fireEvent.click(screen.getByLabelText("Previous slide"));
  expect(getImageSrc("http://example.com/image1.jpg")).toBe(true);
});
