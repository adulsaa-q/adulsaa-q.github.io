// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { NumberTicker } from "@/components/motion/number-ticker";
import { TextScramble } from "@/components/motion/text-scramble";
import { WordRotate } from "@/components/motion/word-rotate";

afterEach(cleanup);

describe("Motion Components", () => {
  describe("TextScramble", () => {
    it("renders with accessible screen-reader text", () => {
      render(<TextScramble text="01" />);
      expect(screen.getAllByText("01").length).toBe(2);
      expect(screen.getByLabelText("01")).toBeTruthy();
    });
  });

  describe("WordRotate", () => {
    it("renders the first word with screen-reader text", () => {
      render(
        <WordRotate
          words={["Multi-Channel Star Schema Models", "PostgreSQL Relational Knowledge Graphs"]}
        />,
      );
      expect(screen.getByText("Multi-Channel Star Schema Models")).toBeTruthy();
    });
  });

  describe("NumberTicker", () => {
    it("renders formatted numbers and accessible sr-only text", () => {
      render(<NumberTicker value={184000} prefix="฿" suffix=" / mo" />);
      // Accessible sr-only contains full prefix + formatted number + suffix
      expect(screen.getByText("฿184,000 / mo")).toBeTruthy();
    });
  });
});
