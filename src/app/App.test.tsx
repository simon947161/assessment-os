// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { App } from "./App";
import { hazards } from "../content/mission01";

describe("mission flow", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
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

  it("announces feedback and returns focus to the opening hotspot", async () => {
    const hazard = hazards[0];
    const unsafeOption = hazard.options.find((option) => !option.isBest);
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Start mission" }));
    const hotspot = screen.getByRole("button", {
      name: "Hazard location 1 of 10, unchecked",
    });
    fireEvent.click(hotspot);

    expect(
      screen.getByRole("heading", { name: hazard.shortTitle }),
    ).toHaveFocus();

    fireEvent.click(
      screen.getByRole("button", { name: unsafeOption!.label }),
    );
    expect(screen.getByRole("status")).toHaveTextContent("Have another go.");

    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(hotspot).toHaveFocus());
  });

  it("supports keyboard activation through the core decision path", async () => {
    const user = userEvent.setup();
    const hazard = hazards[0];
    const bestOption = hazard.options.find((option) => option.isBest);
    render(<App />);

    await user.tab();
    expect(
      screen.getByRole("button", { name: "Start mission" }),
    ).toHaveFocus();
    await user.keyboard("{Enter}");

    const hotspot = screen.getByRole("button", {
      name: "Hazard location 1 of 10, unchecked",
    });
    hotspot.focus();
    await user.keyboard("{Enter}");

    expect(
      screen.getByRole("heading", { name: hazard.shortTitle }),
    ).toHaveFocus();

    const answer = screen.getByRole("button", { name: bestOption!.label });
    answer.focus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("status")).toHaveTextContent("Good call.");

    const close = screen.getByRole("button", { name: "Close" });
    close.focus();
    await user.keyboard("{Enter}");
    await waitFor(() => expect(hotspot).toHaveFocus());
  });
});
