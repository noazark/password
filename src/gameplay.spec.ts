import { SCORE, testSolution, validate } from "./gameplay";

const M = SCORE.MATCH;
const C = SCORE.CLOSE_MATCH;
const P = SCORE.PASS;

test.each`
  password           | solution           | valid    | score        | note
  ${[1]}             | ${[1]}             | ${true}  | ${[M]}       | ${"short match"}
  ${[1, 2, 3]}       | ${[1, 2, 3]}       | ${true}  | ${[M, M, M]} | ${"long match"}
  ${[1, 2, 3]}       | ${[1, 3, 4]}       | ${true}  | ${[M, C, P]} | ${"close match"}
  ${[1, 2, 3]}       | ${[1, 2]}          | ${false} | ${undefined} | ${"solution too short"}
  ${[1, 2, 3]}       | ${[1, 2, 3, 4]}    | ${false} | ${undefined} | ${"solution too long"}
  ${[1, 2, 3]}       | ${null}            | ${false} | ${undefined} | ${"empty solution"}
  ${null}            | ${[1, 2, 3]}       | ${false} | ${undefined} | ${"empty password"}
  ${[1, 2, 3]}       | ${["a", "b", "c"]} | ${false} | ${undefined} | ${"solution contains non-integers"}
  ${["a", "b", "c"]} | ${[1, 2, 3]}       | ${false} | ${undefined} | ${"password contains non-integers"}
`("gameplay.test - $note", ({ password, solution, valid, score }) => {
  expect(testSolution(password, solution)).toEqual({ valid, score });
});

test.each`
  password           | solution           | valid    | note
  ${[1]}             | ${[1]}             | ${true}  | ${"valid password and solution"}
  ${[1]}             | ${[2]}             | ${true}  | ${"solution does not have to match"}
  ${[1, 2, 3]}       | ${[1, 2, 3, 4]}    | ${false} | ${"solution too long"}
  ${[1, 2, 3, 4]}    | ${[1, 2, 3]}       | ${false} | ${"password too long"}
  ${[1, 2, 3]}       | ${null}            | ${false} | ${"empty solution"}
  ${null}            | ${[1, 2, 3]}       | ${false} | ${"empty password"}
  ${[1, 2, 3]}       | ${["1", "2", "3"]} | ${false} | ${"solution contains non-integers"}
  ${["1", "2", "3"]} | ${[1, 2, 3]}       | ${false} | ${"password contains non-integers"}
`("gameplay.validate - $note", ({ password, solution, valid }) => {
  expect(validate(password, solution)).toEqual(valid);
});
