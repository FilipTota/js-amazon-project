import { formatCurrency } from "../../js/utils/money.js";

// create test suite
describe("test suite: formatCurrency", () => {
  // to create a test in jasmine we will use it() function
  it("converts cents into dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
    // expect let's us compare one value to other value
    // expect gives us an object and this object has many methods we can use to do comparisons
    // one of the method is .toEqual() which takes a value to compare
  });

  it("works with zero", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });

  describe("rounding", () => {
    it("rounds up to the nearest cent", () => {
      expect(formatCurrency(2000.5)).toEqual("20.01");
    });

    it("rounds down to the neartest cent", () => {
      expect(formatCurrency(2000.4)).toEqual("20.00");
    });
  });
}); // function provided by jasmine and it creates a group of specs/tests (often called test suite)
// forst parameter is a name for test
// second parameter is function that adds tests

// we can use describe inside describe --- example above
