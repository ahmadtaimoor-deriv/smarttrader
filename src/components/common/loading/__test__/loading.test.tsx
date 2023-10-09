// Test for passing the github actions
// TODO should update this test later
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Loading from "..";

describe("Loading component", () =>
  test("should show loading text", () => {
    render(<Loading />);
    expect(screen.getByText("loading")).toBeInTheDocument();
  }));
