import test from "node:test";
import assert from "node:assert/strict";
import { mock } from "node:test";
import { add, subtract, divide } from "./math.js";
import {
  checkValueAccurInStr,
  checkValueAccurInStr2,
  objectToTest,
} from "./basic-values.js";

test("divide should divide two valid numbers", () => {
  const result = divide(10, 2);

  assert.strictEqual(result, 5);
});

test("divide should throw error when the divisor is zero", () => {
  assert.throws(() => divide(10, 0), Error);
});

function buggyFunction() {
  throw new Error("oops!");
}
test("buggyFunction should throw an Error", () => {
  assert.throws(() => buggyFunction(), Error);
});

test("decorateFetchedList should decorate values returned by fetch", () => {
  //Arrange
  const fakeInput = ["a", "b", "c"];
  const fetchMock = mock.method(objectToTest, "fetch", () => fakeInput);

  //Act
  const result = objectToTest.decorateFetchedList();

  //Assert
  assert.deepStrictEqual(result, ["*a*", "*b*", "*c*"]);
  assert.strictEqual(fetchMock.mock.callCount(), 1);
});

test("2+2 should equal 4", () => {
  assert.strictEqual(2 + 2, 4);
  //assert.strictEqual(actual, expected);
});

// //AAA
test("test description", () => {
  // Arrange - arrange the inputs and objects for the test
  // act - invoke, call
  //  Assert - compare the actual result to the expected result
});

test("add should return the sum of two numbers", () => {
  // Arrange
  const firstNumber = 2;
  const secondNumber = 3;
  // Act
  const result = firstNumber + secondNumber;
  // Assert
  assert.strictEqual(result, 5);
  //   assert.notStrictEqual(result, 10);

  //   assert.deepStrictEqual( [1, 2, 3], [1, 2, 3] );
  //   assert.strictEqual( [1, 2, 3], [1, 2, 3] ); //NOT
  //   assert.ok(10 > 5);
});

test("array should contain three numbers", () => {
  const result = [1, 2, 3];
  assert.deepStrictEqual(result, [1, 2, 3]);
});

test("add should return the sum of two numbers", () => {
  //Arrange
  const num1 = 2;
  const num2 = 3;
  //Act
  const result = add(num1, num2);

  //Assert
  assert.strictEqual(result, 5);
});

test("subtract should return difference between two numbers", () => {
  //Arrage
  const num1 = 5;
  const num2 = 3;

  //Act
  const result = subtract(num1, num2);

  //Assert
  assert.strictEqual(result, 2);
});

test("e should accure in shecodes 2 times", () => {
  const str = "shecodes";
  const letter = "e";

  const res = checkValueAccurInStr(str, letter, 2);

  assert.strictEqual(res, 2);
});

test("e should accure in shecodes 2 times", () => {
  const str = "shecodes";
  const letter = "e";
  const count = 2;

  const res = checkValueAccurInStr2(str, letter, count);

  assert.strictEqual(res, true);
});

test("c should NOT accure in shecodes 2 times", () => {
  const str = "shecodes";
  const letter = "c";
  const count = 2;

  const res = checkValueAccurInStr2(str, letter, count);

  assert.strictEqual(res, false);
});
