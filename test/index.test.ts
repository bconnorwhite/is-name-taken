import { test, expect } from "@jest/globals";
import { isTaken, isValid } from "../source";

test("conflict", (done) => {
  isTaken("ch-alk").then((result) => {
    expect(result).toBe("chalk");
    done?.();
  });
}, 30000);

test("no conflict", (done) => {
  isTaken("package-that-doesnt-exist").then((result) => {
    expect(result).toBe(false);
    done?.();
  });
}, 30000);

test("conflict optimistic", (done) => {
  isTaken("ch-alk", { optimistic: true }).then((result) => {
    expect(result).toBe("chalk");
    done?.();
  });
});

test("no conflict optimistic", (done) => {
  isTaken("package-that-doesnt-exist", { optimistic: true }).then((result) => {
    expect(result).toBe(false);
    done?.();
  });
});

test("timeout", (done) => {
  isTaken("ch-alk", { maxAge: 60000 }).then((result) => {
    expect(result).toBe("chalk");
    done?.();
  });
});

test("invalid name", (done) => {
  isTaken("INVALID_NAME").then((result) => {
    expect(result).toBe(true);
    done?.();
  });
});

test("is valid", () => {
  expect(isValid("chalk")).toBe(true);
});

test("not valid", () => {
  expect(isValid("INVALID_NAME")).toBe(false);
});
