import { duplicateElements } from "./duplicate-elements";

describe("Duplicate Elements ", () => {
  it("should return an array with duplicate elements (primitive type)", () => {
    const array = [1, 2];

    return expect(duplicateElements(array)).toEqual([1, 2, 1, 2]);
  });

  it("should return an array with duplicate elements (object)", () => {
    const array = [
      {
        name: "Luigi",
      },
      {
        name: "Francesco",
      },
    ];

    return expect(duplicateElements(array)).toEqual([
      {
        name: "Luigi",
      },
      {
        name: "Francesco",
      },
      {
        name: "Luigi",
      },
      {
        name: "Francesco",
      },
    ]);
  });
});
