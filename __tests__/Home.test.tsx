import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import Home from "@/components/home";
import { createMockStore, mockImages } from "../__mocks__/next/mockStore";

// Component mocks
jest.mock("@/components/header", () => () => <div data-testid="header" />);
jest.mock("@/components/footer", () => () => <div data-testid="footer" />);
jest.mock("@/components/banner", () => () => <div data-testid="banner" />);
jest.mock(
  "@/components/text",
  () =>
    ({ text, children }: { text: string; children: React.ReactNode }) =>
      <div data-testid={`text-${text}`}>{children}</div>
);
jest.mock("@/components/carousel", () => {
  return jest.fn((props) => {
    return (
      <div data-testid="carousel" data-slides={JSON.stringify(props.slides)} />
    );
  });
});
jest.mock(
  "@/components/ImageCard",
  () =>
    ({ url, id, title }: { url: string; id: number; title: string }) =>
      <div data-testid={`image-card-${id}`}>{title}</div>
);
jest.mock(
  "@/components/Modal",
  () =>
    ({
      isVisible,
      onClose,
      children,
    }: {
      isVisible: boolean;
      onClose: () => void;
      children: React.ReactNode;
    }) =>
      isVisible ? (
        <div data-testid="modal" onClick={onClose}>
          {children}
        </div>
      ) : null
);

beforeAll(() => {
  Object.defineProperty(window, "location", {
    value: {
      reload: jest.fn(),
    },
    writable: true,
  });
});

describe("Home Component", () => {
  let store: ReturnType<typeof createMockStore>;

  // Set up a fresh mock store before each test
  beforeEach(() => {
    store = createMockStore();
  });

  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <Home initialError={null} onRefresh={() => {}} />
      </Provider>
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("displays the banner and text components", () => {
    render(
      <Provider store={store}>
        <Home initialError={null} onRefresh={() => {}} />
      </Provider>
    );
    expect(screen.getByTestId("banner")).toBeInTheDocument();
    expect(screen.getByTestId("text-Text 1")).toBeInTheDocument();
    expect(screen.getByTestId("text-Text 2")).toBeInTheDocument();
  });

  it("renders image cards for desktop view", () => {
    render(
      <Provider store={store}>
        <Home initialError={null} onRefresh={() => {}} />
      </Provider>
    );
    mockImages.forEach((image) => {
      expect(screen.getByTestId(`image-card-${image.id}`)).toBeInTheDocument();
    });
  });

  it("renders carousel for mobile view", () => {
    render(
      <Provider store={store}>
        <Home initialError={null} onRefresh={() => {}} />
      </Provider>
    );
    expect(screen.getByTestId("carousel")).toBeInTheDocument();
  });

  it("displays error modal when initialError is provided", () => {
    const error = "Test error message";
    render(
      <Provider store={store}>
        <Home initialError={error} onRefresh={() => {}} />
      </Provider>
    );
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it("closes modal and calls onRefresh when clicking refresh button", () => {
    const onRefreshMock = jest.fn();
    render(
      <Provider store={store}>
        <Home initialError="Test error" onRefresh={onRefreshMock} />
      </Provider>
    );

    const refreshButton = screen.getByText("Refresh Page");
    fireEvent.click(refreshButton);

    expect(onRefreshMock).toHaveBeenCalled();
  });
  it("sets error state from initialError prop on mount", () => {
    const initialError = "Initial error message";
    render(
      <Provider store={store}>
        <Home initialError={initialError} onRefresh={() => {}} />
      </Provider>
    );

    // Check if the error modal is displayed with the initial error message
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText(initialError)).toBeInTheDocument();
  });

  it("updates error state when initialError prop changes", () => {
    const { rerender } = render(
      <Provider store={store}>
        <Home initialError={null} onRefresh={() => {}} />
      </Provider>
    );

    // Initially, there should be no error modal
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();

    // Update the component with a new initialError prop
    rerender(
      <Provider store={store}>
        <Home initialError="New error message" onRefresh={() => {}} />
      </Provider>
    );

    // Now, the error modal should be visible with the new error message
    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("New error message")).toBeInTheDocument();
  });
});
