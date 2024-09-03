import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "@/components/Modal";

describe("Modal Component", () => {
  test("renders content inside modal when visible", () => {
    render(
      <Modal isVisible={true} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  test("does not render modal when not visible", () => {
    render(
      <Modal isVisible={false} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.queryByText("Modal Content")).toBeNull();
  });

  test("calls onClose function when close button is clicked", () => {
    const onClose = jest.fn(); // Mock function
    render(
      <Modal isVisible={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );
    // Click the close button using aria-label
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalled(); // Verify onClose was called
  });
});
