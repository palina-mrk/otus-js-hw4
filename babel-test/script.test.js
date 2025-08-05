import { calcSum } from "./script.js";

describe("check export and import function", () => {
  it("calcsum(12, 15) returns 27 ", () => {
    expect(calcSum(12, 15)).toBe(27);
  });
});
