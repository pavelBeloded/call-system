import { describe, it, expect } from "vitest";
import { generateTimeSeriesData } from "./shared";

describe("Unit: shared helpers", () => {
  it("generateTimeSeriesData creates 24 points by default", () => {
    const data = generateTimeSeriesData();
    expect(data).toHaveLength(24);

    expect(data[0]).toHaveProperty("time");
    expect(data[0]).toHaveProperty("value");
  });
});
