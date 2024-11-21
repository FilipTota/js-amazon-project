import { formatCurrency } from "../js/utils/money.js";

// Automated testing - using code to test code

// grouping similar test together
// BTW group of related test is called test suite
console.log("Test suite: formatCurrency");

// give each test a name: (naming convenction is to describe what we are doing)
console.log("converts cents into dollars");
if (formatCurrency(2095) === "20.95") console.log("passed");
else console.log("failed");

// testing in a differnent situation
console.log("work with zero");
if (formatCurrency(0) === "0.00") console.log("passed");
else console.log("failed");

// rounds up to the nearest cent
console.log("rounds up to the nearest cent");
if (formatCurrency(2000.5) === "20.01") console.log("passed");
else console.log("failed");

// how many test cases should we have?
// generaly we are testing 2 types of test cases
// 1. basic test cases - tests if the code is working or not
// 2. edge cases - test with values that are tricky (on the edge of what our code can handle )

// generaly we sould try to test something different in each test case

// example of test with 2000.4 (this should round to zero)
console.log("rounds down to the neartest cent");
if (formatCurrency(2000.4) === "20.00") console.log("passed");
else "failed";
