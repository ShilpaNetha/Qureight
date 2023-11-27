import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Upload from "../components/upload";

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../services/ApiClient", () => ({
  uploadImage: jest.fn(),
}));

describe("Upload Component", () => {
  it("renders without crashing", () => {
    render(<Upload />);
  });

  it("submits the form and simulates image processing", async () => {
    const { getByText } = render(<Upload />);

    fireEvent.change(getByText("Click to upload"));

    fireEvent.click(getByText("Submit"));
  });

  it("displays validation error when submitting without selecting a file", async () => {
    const { getByText } = render(<Upload />);

    fireEvent.click(getByText("Submit"));

    await waitFor(() => {
      expect(getByText("Please upload an image file")).toBeInTheDocument();
    });
  });
});
