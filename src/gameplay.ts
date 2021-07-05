import randomInt from "random-int";

export enum SCORE {
  MATCH = "match",
  CLOSE_MATCH = "close_match",
  PASS = "pass",
}

export type Password = number[];

type Test = {
  valid: boolean;
  score: SCORE[] | undefined;
};

export type Attempt = {
  solution: Password;
  test: Test;
};

export type Game = {
  password: Password;
  attempts: Attempt[];
  stage: Password;
};

export function createGame(passwordLength: number): Game {
  return {
    password: createPassword(passwordLength),
    attempts: [],
    stage: [],
  };
}

export function createPassword(passwordLength: number, values = 10): Password {
  const password = [];

  for (let i = passwordLength; i > 0; i--) {
    password.push(Number(randomInt(0, values - 1)));
  }

  return password;
}

export function validate(password: Password, solution: Password): boolean {
  if (password == null || solution == null) return false;

  const hasCorrectLength = password.length === solution.length;
  const hasOnlyIntegers = [...password, ...solution].every(Number.isInteger);

  return hasCorrectLength && hasOnlyIntegers;
}

export function testSolution(password: Password, solution: Password): Attempt {
  // quickly invalidate test
  if (validate(password, solution) === false) {
    return {
      solution,
      test: {
        valid: false,
        score: undefined,
      },
    };
  }

  // default to pass
  const score: SCORE[] = solution.map(() => SCORE.PASS);

  // find exact matches
  for (const i in password) {
    if (password[i] === solution[i]) {
      score[i] = SCORE.MATCH;
    }
  }

  // find close matches
  for (const i in password) {
    const el0 = password[i];
    const idx = solution.indexOf(el0);

    if (score[i] !== SCORE.MATCH && idx >= 0) {
      score[idx] = SCORE.CLOSE_MATCH;
    }
  }

  return {
    solution,
    test: {
      valid: true,
      score,
    },
  };
}

export function getCount(val: SCORE, attempt: Attempt): number {
  return attempt.test.score?.filter((el) => el === val).length || 0;
}

export function makeAttempt(
  password: Password,
  attempts: Attempt[],
  solution: Password
) {
  return [...attempts, testSolution(password, solution)];
}

export function hasWinningAttempt(password: Password, attempts: Attempt[]) {
  return attempts.some(
    (attempt) => getCount(SCORE.MATCH, attempt) === password.length
  );
}
