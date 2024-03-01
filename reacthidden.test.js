import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Hidden from "./Hidden"; // Adjust the import path as needed

// Mocking debounce function to execute immediately for testing
jest.mock("./debounce", () => jest.fn((fn) => fn));

describe("Hidden Component", () => {
  // Utility function to mock window.matchMedia
  const createMatchMedia = (matches) => {
    return (query) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });
  };

  beforeEach(() => {
    // Reset window.matchMedia mock before each test
    window.matchMedia = jest.fn().mockImplementation(createMatchMedia(false));
  });

  it("Renders children when no props are passed", () => {
    window.matchMedia = jest.fn().mockImplementation(createMatchMedia(false));
    const { getByText } = render(
      <Hidden>
        <p>Test Content</p>
      </Hidden>
    );

    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("Renders children when the condition is not met and not inverted", () => {
    window.matchMedia = jest.fn().mockImplementation(createMatchMedia(false));
    const { getByText } = render(
      <Hidden xs>
        <p>Test Content</p>
      </Hidden>
    );

    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("Does not render children when the condition is met and not inverted", () => {
    window.matchMedia = jest.fn().mockImplementation(createMatchMedia(true));
    const { queryByText } = render(
      <Hidden xs>
        <p>Test Content</p>
      </Hidden>
    );

    expect(queryByText("Test Content")).toBeNull();
  });

  it("Renders children when the condition is met and inverted", () => {
    window.matchMedia = jest.fn().mockImplementation(createMatchMedia(true));
    const { getByText } = render(
      <Hidden xs invert>
        <p>Test Content</p>
      </Hidden>
    );

    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("calls onShow and onHide callbacks appropriately", () => {
    const handleShow = jest.fn();
    const handleHide = jest.fn();

    // Initial matchMedia returns false, should call onHide if visible initially
    window.matchMedia = jest.fn().mockImplementation(createMatchMedia(false));
    render(
      <Hidden xs onShow={handleShow} onHide={handleHide}>
        <p>Test Content</p>
      </Hidden>
    );

    // Simulate a change that would trigger the component to update visibility
    window.matchMedia = jest.fn().mockImplementation(createMatchMedia(true));
    fireEvent(window, new Event("resize"));

    expect(handleHide).toHaveBeenCalledTimes(1);
    expect(handleShow).not.toHaveBeenCalled();

    // Simulate another change to trigger visibility back
    window.matchMedia = jest.fn().mockImplementation(createMatchMedia(false));
    fireEvent(window, new Event("resize"));

    expect(handleShow).toHaveBeenCalledTimes(1);
  });
});
