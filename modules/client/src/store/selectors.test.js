import { getPerformance } from "./selectors";

describe("parse definition", () => {
  test("getPerformance", () => {
    const def = {
      performances: [{ name: "a" }, { name: "b" }]
    };
    expect(getPerformance(def, 1)).toEqual({ name: "b" });
  });
});
