import { shuffleElements } from "./shuffle-elements";

describe("shuffleElements ", () => {
  it("should return an array with the same length", () => {
    const array = [1, 2];

    return expect(shuffleElements(array)).toHaveLength(2);
  });

  it("should return an array with same elements", () => {
    const array = [1, 2];

    return expect(shuffleElements(array)).toEqual(
      expect.arrayContaining(array)
    );
  });
});
