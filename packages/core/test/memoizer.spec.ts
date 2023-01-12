import { expect, it } from "vitest";
import { memoize } from "../src/utility/memoizer";
import { createClassed } from "../src/index";

it("Should memoize the output", () => {
  let runCount = 0;
  const cx = (classNames: string[]) => classNames.filter(Boolean).join(" ");

  const cn = (...classes: string[]) => {
    runCount++;
    return cx(classes);
  };

  const { classed } = createClassed({
    memoizer: memoize,
    merger: cn,
  });

  const test = classed({
    variants: {
      color: {
        red: "text-red-500",
        blue: "text-blue-500",
      },
    },
  });

  test({ color: "red" });
  test({ color: "red" });
  test({ color: "red" });
  test({ color: "red" });
  test({ color: "red" });
  test({ color: "red" });
  test({ color: "red" });
  test({ color: "red" });
  test({ color: "red" });

  expect(runCount).toBe(1);
});
