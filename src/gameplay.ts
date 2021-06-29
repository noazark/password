import randomInt from "random-int";

export const VALID = "valid";
export const SCORE = "score";
export const MATCH = "match";
export const CLOSE_MATCH = "close-match";
export const PASS = "pass";

export type Password = number[];
export type Solution = number[];

export type Test = {
  valid: boolean;
  score: string[] | undefined;
};

export type Attempt = {
  solution: Solution;
  test: Test;
};

export function createPassword(len: number, values = 10) {
  const pw = [];

  for (let i = len; i > 0; i--) {
    pw.push(Number(randomInt(0, values - 1)));
  }

  return pw;
}

export function validate(pw: Password, solution: number[]) {
  const hasCorrectLength = pw.length === solution.length;
  const hasOnlyIntegers = solution.every(el => Number.isInteger(el));

  return hasCorrectLength && hasOnlyIntegers;
}

export function test(pw: Password, solution: number[]): Test {
  const isValid = validate(pw, solution);

  if (isValid === false) {
    return {
      [VALID]: isValid,
      [SCORE]: undefined
    };
  }

  const score: string[] = pw.map(n => String(n));
  const solutionClone: string[] = solution.map(n => String(n));

  for (let i in pw) {
    const el0 = pw[i];
    const el1 = solution[i];

    if (el0 === el1) {
      score[i] = solutionClone[parseInt(i)] = MATCH;
    }
  }

  for (let i in pw) {
    const el0 = pw[i];

    if (score[i] !== MATCH && solutionClone.includes(String(el0))) {
      const idx = solutionClone.indexOf(String(el0));
      score[i] = solutionClone[idx] = CLOSE_MATCH;
    }
  }

  for (let i in pw) {
    if (score[i] !== MATCH && score[i] !== CLOSE_MATCH) {
      score[i] = PASS;
    }

    if (solutionClone[i] !== MATCH && solutionClone[i] !== CLOSE_MATCH) {
      solutionClone[i] = PASS;
    }
  }

  return {
    [VALID]: isValid,
    [SCORE]: solutionClone
  };
}

export function getCount(mark: string, attempt: Attempt) {
  return attempt.test[SCORE]?.filter(el => el === mark).length;
}

export function makeAttempt(
  pw: Password,
  attempts: Attempt[],
  solution: Solution
) {
  return [...attempts, { solution, test: test(pw, solution) }];
}

export function hasWinningAttempt(pw: Password, attempts: Attempt[]) {
  return attempts.some(attempt => getCount(MATCH, attempt) === pw.length);
}
