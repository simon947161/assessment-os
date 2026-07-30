// @vitest-environment jsdom

import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "./App";
import { hazards } from "../content/mission01";

describe("mission flow", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("starts, resolves all ten hazards, completes and restarts", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Start mission" }));

    for (const hazard of hazards) {
      fireEvent.click(
        screen.getByRole("button", {
          name: `Hazard location ${hazard.number} of 10, unchecked`,
        }),
      );
      const bestOption = hazard.options.find((option) => option.isBest);
      expect(bestOption).toBeDefined();
      fireEvent.click(
        screen.getByRole("button", { name: bestOption!.label }),
      );
      fireEvent.click(screen.getByRole("button", { name: "Close" }));
    }

    expect(
      screen.getByText("All ten locations checked."),
    ).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", { name: "View mission result" }),
    );

    expect(
      screen.getByRole("heading", { name: "Workshop scan finished" }),
    ).toBeTruthy();
    expect(screen.getByText("20")).toBeTruthy();

    fireEvent.click(
      screen.getByRole("button", { name: "Restart for next learner" }),
    );
    expect(
      screen.getByRole("button", { name: "Start mission" }),
    ).toBeTruthy();
  });
});
