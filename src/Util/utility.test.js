import trimDescription from "../Util/UtilityFunctions.ts";

test("addition", () => {
  const answer = 2;
  const test = 1 + 1;
  expect(answer).toBe(test);
});

test("trim description test", () => {
  const testString = "this is a test with one <p>";
  const test = trimDescription(testString);
  const expectedAnswer = "this is a test with one ";
  expect(test).toBe(expectedAnswer);
});
