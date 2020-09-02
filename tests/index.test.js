const { isTaken, isValid } = require("../build/index.js");

test("conflict", (done) => {
  isTaken("ch-alk").then((result) => {
    expect(result).toBe("chalk");
    done();
  });
});

test("no conflict", (done) => {
  isTaken("package-that-doesnt-exist").then((result) => {
    expect(result).toBe(false);
    done();
  });
});

test("invalid name", (done) => {
  isTaken("INVALID_NAME").then((result) => {
    expect(result).toBe(true);
    done();
  });
});

test("is valid", () => {
  expect(isValid("chalk")).toBe(true);
});

test("not valid", () => {
  expect(isValid("INVALID_NAME")).toBe(false);
});
